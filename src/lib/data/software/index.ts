import type { TechnologyName } from '../technologies';
import { crbt } from './crbt';

export interface Software {
	id: string;
	name: string;
	tags: string[];
	category: string;
	technologies: TechnologyName[];
	iconPath: string;
	iconThumbnailPath: string;
	description: string;
	gallery?: string[];
	links?: {
		repoUrl?: string;
		projectUrl?: string;
	};
	outsideLinks?: { label: string; href: string }[];
	createdAt: Date;
	finishedAt?: Date;
	themeGradient: {
		from: `#${string}`;
		to: `#${string}`;
	};
}

export const softwareData: Software[] = [crbt].sort(
	(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
);
