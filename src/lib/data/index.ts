import { archives } from './archive';
import { allPosts } from './blog';

export const allObjectIds = [
	...archives.map((archive) => `archive/${archive.id}`),
	...allPosts.map((post) => `blog/${post.categoryId}/${post.id}`),
];
