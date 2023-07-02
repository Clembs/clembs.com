import { crbt2023 } from './crbt-2023';
import { delegue } from './delegue';
import { purplet2022 } from './purplet-2022';
import { kikuri } from './kikuri';
import type { TechnologyName } from '../technologies';

export interface BrandingPost {
	id: string;
	brand: string;
	isCommission: boolean;
	title: string;
	tags: string[];
	technologies: TechnologyName[];
	bannerPath: string;
	bannerThumbnailPath: string;
	iconPath: string;
	brief: string;
	links?: {
		projectUrl?: string;
		assetsUrl?: string;
		repoUrl?: string;
	};
	createdAt: Date;
	finishedAt: Date;
	themeGradient: {
		from: `#${string}`;
		to: `#${string}`;
	};
}

export const brandingData: BrandingPost[] = [kikuri, purplet2022, crbt2023, delegue].sort(
	(a, b) => b.finishedAt.getTime() - a.finishedAt.getTime()
);
