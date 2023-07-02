import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const purplet2022: BrandingPost = {
	id: 'purplet-2022',
	brand: 'Purplet',
	title: 'Purplet: Next-gen tools to build modern Discord apps.',
	createdAt: new Date('2022-10-07'),
	finishedAt: new Date('2022-10-18'),
	links: { projectUrl: 'https://purplet.js.org', repoUrl: 'https://github.com/CRBT-Team/Purplet' },
	isCommission: false,
	technologies: [TechnologyName.XD, TechnologyName.Svelte],
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF',
	},
	tags: ['Collaboration', 'Software', 'Library', 'Discord', 'Branding'],
	brief:
		"Purplet is an ecosystem of libraries for building modern Discord apps with JavaScript, made by my friend Dave and I. Ahead of Purplet 2's launch, I decided to rebrand it to match our vision of making Discord applications.",
	iconPath: 'https://c.clembs.com/branding/purplet-2022/favicon.svg',
	bannerPath: 'https://c.clembs.com/branding/purplet-2022/purplet-2022.webp',
	bannerThumbnailPath: '/assets/small-banners/purplet-2022.png',
};
