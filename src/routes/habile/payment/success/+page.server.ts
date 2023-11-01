import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { stripeApi } from '$lib/stripe';

export const load: PageServerLoad = async ({ url, locals: { getUserData } }) => {
	// const userData = await getUserData();
	// if (!userData) throw error(401);

	const sessionId = url.searchParams.get('session_id');
	if (!sessionId) throw error(400, { message: 'Invalid request' });

	const sessionWithLineItems = await stripeApi.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items'],
	});

	const productId = sessionWithLineItems.line_items!.data[0].price!.product.toString();
	const product = await stripeApi.products.retrieve(productId);

	return {
		product,
		session: sessionWithLineItems,
		// userData,
		themeGradient: {
			from: 'var(--color-success)',
			to: 'var(--color-success)',
		},
	};
};
