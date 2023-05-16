import type { BrandingPost } from '../branding';
import { TechnologyName } from '../technologies';

export const delegue: BrandingPost = {
	id: 'delegue',
	brand: 'Ensemble vers la réussite',
	title: 'Ensemble vers la réussite: A guide to a winning class rep campaign',
	createdAt: new Date('2022-09-21'),
	finishedAt: new Date('2022-09-16'),
	url: 'https://delegue.clembs.com',
	isCommission: false,
	themeGradient: {
		from: '#18C6F2',
		to: '#1877F2'
	},
	technologies: [TechnologyName.XD, TechnologyName.Svelte],
	tags: ['Entreprise', 'Software', 'Branding', 'UI', 'Web design'],
	brief:
		"I started CRBT in 2019 as my very first coding experiment, and over the years it's become more complete and defined, as a true multi-purpose Discord bot.<br>As the project evolved a lot the past year, its website needed a serious refresh to reflect it, and what the future holds for it.<br>Inspired by Material You, the new website features a clean and refined design that works on all screen sizes and themes.",
	iconPath: '/favicon.svg',
	assets: [
		['/banner.png'],
		['/banner-colors.png', '/headings.png'],
		['/explanations.png'],
		['/colors.png', '/icon-small.png']
	],
	bannerPath: '/banner.png'
};
