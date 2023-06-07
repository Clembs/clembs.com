import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const delegue: BrandingPost = {
	id: 'delegue',
	brand: 'Ensemble vers la réussite',
	title: 'Ensemble vers la réussite: A guide to a winning class rep campaign',
	createdAt: new Date('2022-09-21'),
	finishedAt: new Date('2022-09-16'),
	links: { projectUrl: 'https://delegue.clembs.com' },
	isCommission: false,
	themeGradient: {
		from: '#18C6F2',
		to: '#1877F2',
	},
	technologies: [TechnologyName.XD, TechnologyName.Svelte],
	tags: ['Entreprise', 'Software', 'Branding', 'UI', 'Web design'],
	brief: '',
	assets: [],
	iconPath: 'https://c.clembs.com/branding/delegue/favicon.svg',
	bannerPath: 'https://c.clembs.com/branding/delegue/banner.png',
	bannerThumbnailPath: '/assets/small-banners/delegue.png',
};
