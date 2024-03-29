import { allPosts } from '$lib/data/blog';
import { categories } from '$lib/data/blog/_categories';

export async function load() {
	return {
		categories: categories,
		posts: allPosts,
	};
}
