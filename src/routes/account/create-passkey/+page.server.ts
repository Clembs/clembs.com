import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getUserData } }) => {
	const user = await getUserData();

	if (!user) {
		throw redirect(301, '/settings');
	}
};
