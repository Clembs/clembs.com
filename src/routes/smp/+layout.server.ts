import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const language = cookies.get('language') || 'en';

	return {
		themeGradient: { from: '#987fff', to: '#987fff' },
		language,
	};
};
