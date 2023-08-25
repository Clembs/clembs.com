import type { LayoutServerLoad } from './$types';
import { db } from '$lib/db';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	const userData =
		session && session.user?.id
			? await db.query.users.findFirst({
					where: ({ id }, { eq }) => eq(id, session.user.id),
			  })
			: null;

	// const easterEggUserId = '67435cc7-08a3-4ec1-839e-cc8101adf371';
	const easterEggUserId = '85fb402c-abb7-462b-8fc4-33be9c0a760e';

	return {
		session,
		userData,
		hasNameChange: userData?.id === easterEggUserId,
	};
};
