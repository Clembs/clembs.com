import type { categories } from './categories';
import type { Project } from '../projects';

export interface Article {
	slug: string;
	categoryId: (typeof categories)[number]['id'];
	title: string;
	summary: string; // shown in the article under the title
	subtitle?: string; // shown in the list under the title

	relatedProject?: Project;
	createdAt: Date;
	finishedAt?: Date;

	bannerPath?: string;
	bannerThumbnailPath?: string;

	links?: {
		projectUrl?: string;
		assetsUrl?: string;
	};
	brand?: {
		name: string;
		iconPath?: string;
		href?: string;
	};
}

export const blogArticles = Object.values(
	import.meta.glob<true, string, { default: Article }>('./**/*.ts', {
		eager: true,
	}),
)
	.map((post) => post.default)
	.filter(Boolean)
	.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as Article[];
