import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		navButton: {
			href: '/smp',
			label: 'Habile SMP',
		},
	};
};
