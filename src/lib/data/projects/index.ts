import { acknowledgements } from './acknowledgements';
import { messages } from './messages';
import { islands } from './islands';
import { mecaniqueNumerique } from './mecanique-numerique';
import { jamesHuang } from './james-huang';
import type { Article } from '../blog-articles';

export interface Project {
	id: string;
	name: string;
	brief: string;
	iconPath: string;
	iconThumbnailPath: string;
	// screenshotPath: string;
	// demoVideoPath: string;
	relatedArticle?: Article;
	links: {
		repoUrl?: string;
		projectUrl?: string;
		downloadUrl?: string;
	};
	createdAt: Date;
	finishedAt?: Date;
}

export const projects: Project[] = [
	acknowledgements,
	messages,
	// comments,
	mecaniqueNumerique,
	jamesHuang,
	islands,
	// habileChat
].sort((a, b) => (b.finishedAt || b.createdAt).getTime() - (a.finishedAt || a.createdAt).getTime());
