import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { player } = await parent();

	if (player) throw redirect(303, '/smp');

	return {
		navButton: {
			href: '/smp/register',
			label: 'Register',
		},
	};
};
