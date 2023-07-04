import { softwareData } from '$lib/data/software';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	const h = softwareData.find(({ id }) => id === url.pathname.split('/').at(-1));

	return {
		themeGradient: h?.themeGradient,
		...h,
	};
};
