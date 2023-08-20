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

	return {
		session,
		userData,
	};
};
