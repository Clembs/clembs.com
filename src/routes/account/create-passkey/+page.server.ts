import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getUserData } }) => {
	const user = await getUserData();

	if (!user) {
		redirect(301, '/settings');
	}

	return {
		navButton: {
			label: 'Settings',
			href: '/settings',
		},
	};
};
