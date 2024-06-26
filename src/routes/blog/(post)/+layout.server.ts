import { allPosts } from '$lib/data/blog';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { categories } from '$lib/data/blog/_categories';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({ url, setHeaders, depends }) => {
	const categoryId = url.pathname.split('/').at(2);
	const postId = url.pathname.split('/').slice(3).join('/');

	if (!categoryId || !postId) error(404);

	const category = categories.find((c) => c.id === categoryId);
	if (!category) error(404);

	const post = allPosts.find((p) => p.id === postId && p.categoryId === categoryId);
	if (!post) error(404);

	const comments = await getComments({
		projectId: `blog/${post.categoryId}/${post.id}`,
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
			label: 'Blog',
			href: '/blog',
		},
	};
};
