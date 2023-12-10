import { acknowledgements } from './acknowledgements';
import { comments } from './comments';
import { crbt } from './crbt';
import { habileChat } from './habile-chat';
import { messages } from './messages';
import { purplet } from './purplet';
import { unibros } from './unibros';

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
	brief: string;
	iconPath: string;
	iconThumbnailPath: string;
	description?: string;
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
	platforms?: (keyof typeof softwarePlatforms)[];
}

export const softwareData: Software[] = [
	crbt,
	purplet,
	acknowledgements,
	messages,
	habileChat,
	comments,
	unibros,
].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
