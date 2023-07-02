import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const kikuri: BrandingPost = {
	id: 'kikuri',
	brand: 'Kikuri',
	title: 'Kikuri Website Design: The fun and casual card collecting Discord bot.',
	createdAt: new Date('2023-04-29'),
	finishedAt: new Date('2023-06-23'),
	isCommission: true,
	links: { projectUrl: 'https://kikuri-bot.com' },
	themeGradient: {
		from: '#BA3F3D',
		to: '#5D1C3C',
	},
	technologies: [TechnologyName.Figma, TechnologyName.Spline],
	tags: ['Discord', 'Web design', 'UI', 'UX'],
	brief:
		'Kikuri is an anime-themed card-collecting Discord bot where users manage their cards and use them to combat other users. Its team approached me to make a more content-rich and responsive website that fit their branding.',
	iconPath: 'https://c.clembs.com/branding/kikuri/avatar.webp',
	bannerPath: 'https://c.clembs.com/branding/kikuri/kikuri.webp',
	bannerThumbnailPath: '/assets/small-banners/kikuri.png',
};
