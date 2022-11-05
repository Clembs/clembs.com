import { brandingData } from '$lib/data/branding';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const h = brandingData.find(({ id }) => id === params.id);

	console.log(h);
	return h;
};
