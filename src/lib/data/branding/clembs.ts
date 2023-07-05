import type { BrandingPost } from '.';

export const clembs: BrandingPost = {
	id: 'clembs',
	brand: 'Clembs',
	title: 'Clembs - Nice to meet you, again.',
	createdAt: new Date('2023-07-05'),
	links: { projectUrl: 'https://clembs.com' },
	themeGradient: {
		from: '#643FFF',
		to: '#31C0FF',
	},
	category: 'Brand identity & UI/UX design',
	brief: 'Personal brand identity with assets for web, livestreaming, and everywhere that I am.',
	iconPath:
		'https://cdn.discordapp.com/avatars/595731552709771264/90f936a706b20f0798eb271bd16308d3.png?size=2048',
	bannerPath: 'https://c.clembs.com/branding/clembs/clembs.webp',
	bannerThumbnailPath: '/assets/small-banners/clembs.png',
};
