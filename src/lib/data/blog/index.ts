import type { categories } from './_categories';
import type { ThemeGradient } from '../types';

export interface BlogPost {
	id: string;
	categoryId: (typeof categories)[number]['id'];
	title: string;
	brief: string;
	subtitle?: string;
	createdAt: Date;
	bannerPath: string;
	bannerThumbnailPath: string;
	themeGradient: ThemeGradient;
	tags?: string[];
	links?: {
		projectUrl?: string;
		assetsUrl?: string;
		dribbble?: string;
		behance?: string;
		instagram?: string;
	};
	brand?: {
		name: string;
		iconPath?: string;
	};
}

export const allPosts = Object.values(
	import.meta.glob<true, string, { default: BlogPost }>('./**/*.ts', {
		eager: true,
	})
)
	.map((post) => post.default)
	.filter(Boolean)
	.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as BlogPost[];
