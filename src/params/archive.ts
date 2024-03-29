import { archives } from '$lib/data/archive';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!archives.find(({ id }) => id === param);
};
