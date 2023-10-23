import { stripeApi } from '$lib/stripe';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { DISCORD_BOT_TOKEN, VERCEL } from '$env/static/private';
import type { APIUser } from 'discord-api-types/v10';
import { otps, users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { randomInt } from 'crypto';

const skus = [
	{
		value: 50,
		sku: {
			test: 'prod_On0xk7anmEMrzK',
			live: 'prod_OsHVyQ7k0AsRP8',
		},
	},
	{
		value: 200,
		sku: {
			test: 'prod_OrUxCyntf42thJ',
			live: 'prod_OsHWizAFim9Kts',
		},
	},
];

export const load: PageServerLoad = async ({ parent, getClientAddress, fetch }) => {
	const products = await stripeApi.products.list({
		ids: skus.map(({ sku }) => (VERCEL ? sku.live : sku.test)),
	});
	const prices = await stripeApi.prices.list();
	const parentData = await parent();

	if (!parentData.userData) {
		throw redirect(303, '/settings');
	}

	const userData = await db.query.users.findFirst({
		where: ({ id }, { eq }) => eq(id, parentData.userData!.id),
		with: {
			purchases: true,
		},
	});

	let discordData: APIUser | null = null;

	if (parentData.userData.discordUserId) {
		discordData = await (
			await fetch(`https://discord.com/api/users/${parentData.userData.discordUserId}`, {
				headers: {
					Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
				},
			})
		).json();
	}

	const habileChatData = await db.query.habileChatData.findFirst();

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
		userData,
		globalData: habileChatData!,
		isRussian,
		discordData,
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
			payment_method_types: ['card', 'paypal'],
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
	createLinkOtp: async ({ locals: { getUserData } }) => {
		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		const otp = randomInt(100000, 999999);

		await db.insert(otps).values({
			otp,
			email: userData.email!,
			expiresAt: new Date(Date.now() + 1000 * 60 * 5),
		});

		return { otp };
	},
	discordUnlink: async ({ locals: { getUserData } }) => {
		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		await db.update(users).set({ discordUserId: null }).where(eq(users.id, userData.id));

		return { success: true };
	},
};
