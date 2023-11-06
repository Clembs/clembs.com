import { acknowledgements } from './acknowledgements';
import { crbt } from './crbt';
import { habileChat } from './habile-chat';
import { messages } from './messages';
import { purplet } from './purplet';

export const softwarePlatforms = {
	windows: 'Windows',
	Linux: 'Linux',
	Android: 'Android',
	iOS: 'iOS',
	Web: 'Browser',
} as const;

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
	themeGradient: {
		from: string;
		to: string;
	};
	credits?: {
		name: string;
		url?: string;
	}[];
	policy?: string;
	terms?: string;
	platforms?: (keyof typeof softwarePlatforms)[];
}

export const softwareData: Software[] = [
	crbt,
	purplet,
	acknowledgements,
	messages,
	habileChat,
].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
