import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, getUserData } }) => {
	const session = await getSession();
	const userData = await getUserData();

	// const easterEggUserId = '67435cc7-08a3-4ec1-839e-cc8101adf371';
	const easterEggUserId = '85fb402c-abb7-462b-8fc4-33be9c0a760e';

	return {
		session,
		userData,
		hasNameChange: userData?.id === easterEggUserId,
	};
};
