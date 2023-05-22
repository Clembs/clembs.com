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
		to: '#A62541'
	},
	technologies: [TechnologyName.XD, TechnologyName.Svelte, TechnologyName.TypeScript],
	tags: ['Discord', 'Software', 'Web design', 'UI', 'Personal'],
	brief:
		"I started CRBT in 2019 as my very first coding experiment, and over the years it's become more complete and defined, as a true multi-purpose Discord bot.<br>As the project evolved a lot the past year, its website needed a serious refresh to reflect it, and what the future holds for it.<br>Inspired by Material You, the new website features a clean and refined design that works on all screen sizes and themes.",
	iconPath: '/favicon.svg',
	assets: [['https://c.clembs.com/branding/crbt-2023/banner.png']],
	bannerPath: '/banner.png'
};
