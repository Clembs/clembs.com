import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		themeGradient: { from: '#987fff', to: '#987fff' },
	};
};
