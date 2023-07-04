import { acknowledgements } from './acknowledgements';
import { crbt } from './crbt';
import { purplet } from './purplet';

export interface Software {
	id: string;
	name: string;
	category: string;
	iconPath: string;
	iconThumbnailPath: string;
	description: string;
	gallery?: string[];
	links?: {
		repoUrl?: string;
		projectUrl?: string;
	};
	createdAt: Date;
	finishedAt?: Date;
	themeGradient: {
		from: `#${string}`;
		to: `#${string}`;
	};
}

export const softwareData: Software[] = [crbt, purplet, acknowledgements].sort(
	(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
);
