import { allPosts } from '$lib/data/blog';
import { categories } from '$lib/data/blog/_categories';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const categoryId = params.categoryId;
	const category = categories.find((category) => category.id === categoryId);

	if (!category) {
		throw error(404, `Category "${categoryId}" not found`);
	}

	const posts = allPosts.filter((post) => post.categoryId === categoryId);

	return {
		category,
		posts,
	};
}
