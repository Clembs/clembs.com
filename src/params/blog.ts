import { allPosts } from '$lib/data/blog';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!allPosts.find(({ id }) => id === param);
};
