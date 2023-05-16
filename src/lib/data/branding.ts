import { crbt2023 } from './branding/crbt-2023';
import { delegue } from './branding/delegue';
import { purplet2022 } from './branding/purplet-2022';
import { vbot } from './branding/vbot';
import { verticalVision } from './branding/vertical-vision';
import type { TechnologyName } from './technologies';

export interface BrandingPost {
	id: string;
	brand: string;
	isCommission: boolean;
	title: string;
	tags: string[];
	technologies: TechnologyName[];
	bannerPath: string;
	iconPath: string;
	brief: string;
	url?: string;
	assets: string[][];
	createdAt: Date;
	finishedAt: Date;
	themeGradient: {
		from: `#${string}`;
		to: `#${string}`;
	};
}

export const brandingData: BrandingPost[] = [
	purplet2022,
	crbt2023,
	verticalVision,
	delegue,
	vbot
].sort((a, b) => b.finishedAt.getTime() - a.finishedAt.getTime());
