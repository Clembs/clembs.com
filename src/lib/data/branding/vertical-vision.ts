import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const verticalVision: BrandingPost = {
	id: 'vertical-vision',
	brand: 'Vertical Vision',
	title: 'Vertical Vision: Watch your safety',
	createdAt: new Date('2021-06-21'),
	finishedAt: new Date('2023-12-01'),
	links: { projectUrl: 'https://verticalvision.fr' },
	themeGradient: {
		from: '#18C6F2',
		to: '#1877F2',
	},
	isCommission: true,
	tags: ['Entreprise', 'Software', 'Branding', 'UI', 'Web design'],
	technologies: [TechnologyName.XD, TechnologyName.TailwindCSS, TechnologyName.Svelte],
	brief: 'Watch your safety',
	iconPath: 'https://c.clembs.com/branding/vertical-vision/favicon.svg',
	bannerPath: 'https://c.clembs.com/branding/vertical-vision/banner.png',
	bannerThumbnailPath: '/assets/small-banners/vertical-vision.png',
};
