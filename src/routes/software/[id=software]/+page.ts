import { softwareData } from '$lib/data/software';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const h = softwareData.find(({ id }) => id === url.pathname.split('/').at(-1));

	return {
		themeGradient: h?.themeGradient,
		...h,
	};
};
