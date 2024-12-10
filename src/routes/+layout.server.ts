import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, getUserData } }) => {
	const session = await getSession();
	const userData = await getUserData();

	return {
		session,
		userData,
	};
};
