import { projects } from './projects';
import { blogArticles } from './blog-articles';

export const allObjectIds = [
	...projects.map((archive) => `archive/${archive.id}`),
	...blogArticles.map((post) => `blog/${post.categoryId}/${post.slug}`),
];
