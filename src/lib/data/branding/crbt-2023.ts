import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const crbt2023: BrandingPost = {
	id: 'crbt-2023',
	brand: 'CRBT',
	title: 'CRBT Website Redesign: The perfect just-about-anything Discord bot.',
	createdAt: new Date('2022-08-30'),
	finishedAt: new Date('2023-01-25'),
	isCommission: false,
	links: { projectUrl: 'https://crbt.app', repoUrl: 'https://github.com/CRBT-Team/CRBT' },
	themeGradient: {
		from: '#FFCEDF',
		to: '#A62541',
	},
	technologies: [TechnologyName.XD, TechnologyName.Svelte, TechnologyName.TypeScript],
	tags: ['Discord', 'Software', 'Web design', 'UI', 'Personal'],
	brief:
		"CRBT is my first ever program and Discord bot. As it became more feature-rich and polished, I needed to build a new website to reflect how far it's come.",
	iconPath: 'https://c.clembs.com/branding/crbt-2023/favicon.svg',
	bannerPath: 'https://c.clembs.com/branding/crbt-2023/crbt-2023.webp',
	bannerThumbnailPath: '/assets/small-banners/crbt-2023.png',
};
