import { designPosts } from '$lib/data/design';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!designPosts.find(({ id }) => id === param);
};
