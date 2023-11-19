import { crbt2023 } from './crbt-2023';
import { kikuri } from './kikuri';
import { clembs } from './clembs';

export interface DesignPost {
	id: string;
	brand: string;
	title: string;
	bannerPath: string;
	bannerThumbnailPath: string;
	iconPath: string;
	brief: string;
	category: string;
	tags?: string[];
	links?: {
		projectUrl?: string;
		assetsUrl?: string;
		dribbble?: string;
		behance?: string;
		instagram?: string;
	};
	relatedSoftwareId?: string;
	createdAt: Date;
	themeGradient: {
		from: string;
		to: string;
	};
}

export const designPosts: DesignPost[] = [kikuri, crbt2023, clembs].sort(
	(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
);
