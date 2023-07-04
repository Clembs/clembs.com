import { brandingData } from '$lib/data/branding';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	const h = brandingData.find(({ id }) => id === url.pathname.split('/').at(-1));

	return {
		themeGradient: h?.themeGradient,
		...h,
	};
};
