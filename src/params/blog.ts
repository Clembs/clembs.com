import { blogArticles } from '$lib/data/blog-articles';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!blogArticles.find(({ slug: id }) => id === param);
};
