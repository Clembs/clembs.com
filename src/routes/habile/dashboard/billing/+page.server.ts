import { VERCEL } from '$env/static/private';
import { db } from '$lib/db';
import { stripeApi } from '$lib/stripe';
import { skus } from '../_helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const products = await stripeApi.products.list({
		ids: skus.map(({ sku }) => (VERCEL === '1' ? sku.live : sku.test)),
	});

	const parentData = await parent();
	const userData = await db.query.users.findFirst({
		where: ({ id }, { eq }) => eq(id, parentData.userData!.id),
		with: {
			purchases: true,
		},
	});

	return {
		...parentData,
		userData,
		products,
	};
};
