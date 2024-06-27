import { allPosts } from '$lib/data/blog';
import { categories } from '$lib/data/blog/_categories';
import { dateFormat } from '$lib/helpers/dateFormat';
import { error, json } from '@sveltejs/kit';

export async function GET({ params, url }) {
	const categoryId = params.article.split('/')[0];
	const postId = params.article.split('/').slice(1).join('/');

	if (!categoryId || !postId) error(404);

	const category = categories.find((c) => c.id === categoryId);
	const post = allPosts.find((p) => p.id === postId && p.categoryId === categoryId);

	if (!category || !post) error(404);

	return json({
		type: 'rich',
		asset_type: 'article',
		version: '1.0',
		title: post.title,
		summary: post.summary,
		author_name: 'By Clément Voisin',
		publication_date: dateFormat(post.createdAt),
		url: `${url.origin}/blog/${categoryId}/${postId}`,
		provider_name: 'Clembs',
		provider_url: url.origin,
		thumbnail_url: post.bannerPath,
	});
}
