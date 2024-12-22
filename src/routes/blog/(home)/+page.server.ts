import { blogArticles } from '$lib/data/blog-articles';
import { categories } from '$lib/data/blog-articles/categories';

export async function load() {
	return {
		categories: categories,
		posts: blogArticles,
	};
}
