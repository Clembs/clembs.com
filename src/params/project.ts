import { brandingData } from '$lib/data/branding';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!brandingData.find(({ id }) => id === param);
};
