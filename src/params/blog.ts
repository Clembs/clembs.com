import { blogPosts } from '$lib/data/blog';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!blogPosts.find(({ id }) => id === param);
};
