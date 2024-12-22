import { blogArticles } from '$lib/data/blog-articles';
import { categories } from '$lib/data/blog-articles/categories';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const categoryId = params.categoryId;
	const category = categories.find((category) => category.id === categoryId);

	if (!category) {
		error(404, `Category "${categoryId}" not found`);
	}

	const posts = blogArticles.filter((post) => post.categoryId === categoryId);

	return {
		category,
		posts,
		navButton: {
			label: 'Blog',
			href: '/blog',
		},
	};
}
