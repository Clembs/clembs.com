import type { Actions, PageServerLoad } from './$types';
import { stripeApi } from '$lib/stripe';
import { VERCEL } from '$env/static/private';
import { skus } from '../_helpers';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, getClientAddress, fetch }) => {
	const products = await stripeApi.products.list({
		ids: skus.map(({ sku }) => (VERCEL === '1' ? sku.live : sku.test)),
	});
	const prices = await stripeApi.prices.list();
	const parentData = await parent();

	let ipAddress: string;
	let isRussian = false;

	try {
		ipAddress = getClientAddress();
		if (ipAddress !== '::1') {
			const countryData = await (await fetch(`https://ipapi.co/${ipAddress}/country/`)).json();
			isRussian = countryData === 'RU';
		}
	} catch (e) {}

	return {
		products,
		prices,
		...parentData,
		isRussian,
	};
};

export const actions: Actions = {
	createCheckoutSession: async ({ url, request, locals: { getUserData } }) => {
		const formData = await request.formData();
		if (!formData) return fail(400, { message: 'Invalid request' });

		const priceId = formData.get('priceId')?.toString();
		if (!priceId) return fail(400, { message: 'Invalid request' });

		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		const session = await stripeApi.checkout.sessions.create({
			mode: 'payment',
			allow_promotion_codes: true,
			payment_method_types: [
				'card',
				'link',
				'klarna',
				// , 'paypal'
			],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			automatic_tax: { enabled: false },
			customer_email: userData.email!,
			client_reference_id: userData.id,
			success_url: `${url.origin}/habile/payment/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${url.origin}/habile/payment/cancel`,
		});

		throw redirect(303, session.url!);
	},
};
