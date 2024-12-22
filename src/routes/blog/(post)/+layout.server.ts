import { blogArticles } from '$lib/data/blog-articles';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { categories } from '$lib/data/blog-articles/categories';
import { getComments } from '$lib/helpers/getComments';

// notes to self:
// in the case of a case study (with the "work" categoryId), the URL will be /blog/:slug
// in the case of anything else, the URL will be /blog/:categoryId/:slug
export const load: LayoutServerLoad = async ({ url, setHeaders, depends }) => {
	let categoryId = url.pathname.split('/').at(2);

	if (!categoryId) error(404);

	let category = categories.find((c) => c.id === categoryId);

	let postId = url.pathname.split('/').slice(3).join('/');
	let post = blogArticles.find((p) => p.slug === postId && p.categoryId === categoryId);

	if (!category) {
		// if the category doesn't exist, it's maybe a case study
		postId = categoryId;
		categoryId = 'work';
		category = categories.find((c) => c.id === categoryId);
		post = blogArticles.find((p) => p.slug === postId && p.categoryId === categoryId);

		if (!post) error(404);
	}

	if (!category || !post) error(404);

	const comments = await getComments({
		projectId: `blog/${post.categoryId === 'work' ? 'design' : post!.categoryId}/${post!.slug}`,
	});

	depends('comments');

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
	});

	return {
		...post,
		category,
		comments,
		navButton: {
			label: category.name,
			href: `/blog/${category.id}`,
		},
	};
};
