import { crbt2023 } from './crbt-2023';
import { delegue } from './delegue';
import { purplet2022 } from './purplet-2022';
import { kikuri } from './kikuri';

export interface BrandingPost {
	id: string;
	brand: string;
	title: string;
	bannerPath: string;
	bannerThumbnailPath: string;
	iconPath: string;
	brief: string;
	category: string;
	links?: {
		projectUrl?: string;
		assetsUrl?: string;
	};
	relatedSoftwareId?: string;
	createdAt: Date;
	themeGradient: {
		from: `#${string}`;
		to: `#${string}`;
	};
}

export const brandingData: BrandingPost[] = [kikuri, purplet2022, crbt2023, delegue].sort(
	(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
);
