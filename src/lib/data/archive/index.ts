import { acknowledgements } from './acknowledgements';
import { messages } from './messages';
import type { ThemeGradient } from '../types';
import { comments } from './comments';
import { islands } from './islands';
import { mecaniqueNumerique } from './mecanique-numerique';
import { jamesHuang } from './james-huang';

export const softwarePlatforms = {
	windows: 'Windows',
	Linux: 'Linux',
	Android: 'Android',
	iOS: 'iOS',
	Web: 'Browser',
} as const;

export interface Archive {
	id: string;
	name: string;
	brief: string;
	iconPath: string;
	iconThumbnailPath: string;
	description?: string;
	links: {
		repoUrl?: string;
		projectUrl?: string;
		downloadUrl?: string;
		downloadUrls?: {
			platform: keyof typeof softwarePlatforms;
			url: string;
		}[];
		versionHistory?: {
			label: string;
			url: string;
			createdAt: Date;
		}[];
	};
	createdAt: Date;
	finishedAt?: Date;
	themeGradient: ThemeGradient;
	platforms?: (keyof typeof softwarePlatforms)[];
}

export const archives: Archive[] = [
	acknowledgements,
	messages,
	comments,
	mecaniqueNumerique,
	jamesHuang,
	islands,
	// habileChat
].sort((a, b) => (b.finishedAt || b.createdAt).getTime() - (a.finishedAt || a.createdAt).getTime());
