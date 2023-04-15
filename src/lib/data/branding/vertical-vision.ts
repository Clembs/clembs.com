import type { BrandingPost } from '../branding';

export const verticalVision: BrandingPost = {
	id: 'vertical-vision',
	brand: 'Vertical Vision',
	title: 'Vertical Vision: Watch your safety',
	createdAt: new Date('2021-06-21'),
	finishedAt: new Date('2023-12-01'),
	url: 'https://verticalvision.fr',
	themeGradient: {
		from: '#18C6F2',
		to: '#1877F2'
	},
	isCommission: true,
	tags: ['Entreprise', 'Software', 'Branding', 'UI', 'Web design'],
	technologies: ['xd', 'tailwindcss', 'sveltekit'],
	brief: 'watch your safety',
	iconPath: '/favicon.svg',
	assets: [
		['/banner.png'],
		['/banner-colors.png', '/headings.png'],
		['/explanations.png'],
		['/colors.png', '/icon-small.png']
	],
	bannerPath: '/banner.png'
};
