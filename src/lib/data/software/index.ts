import { acknowledgements } from './acknowledgements';
import { crbt } from './crbt';
import { messages } from './messages';
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
		downloadUrl?: string;
		downloadUrls?: {
			android?: string;
			ios?: string;
			windows?: string;
		};
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
	platforms?: ('web' | 'android' | 'ios' | 'windows' | 'linux')[];
}

export const softwareData: Software[] = [crbt, purplet, acknowledgements, messages].sort(
	(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
);
