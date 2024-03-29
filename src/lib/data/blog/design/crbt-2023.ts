import type { BlogPost } from '..';

export default {
	id: 'crbt-2023',
	title: 'CRBT - The perfect just-about-anything Discord app.',
	categoryId: 'design',
	subtitle: 'UI/UX, Web design',
	brand: {
		name: 'CRBT',
		iconPath:
			'https://cdn.discordapp.com/avatars/595731552709771264/90f936a706b20f0798eb271bd16308d3.png?size=2048',
	},
	createdAt: new Date('2023-01-25'),
	links: {
		projectUrl: 'https://crbt.app',
		instagram: 'https://www.instagram.com/p/Cn2fuOotGhn/',
	},
	themeGradient: {
		from: '#FECEDE',
		to: '#FFF9FB',
	},
	summary:
		'Multipurpose Discord bot that helps you get things done quickly through user-friendly and customizable commands.',
	bannerPath: 'https://c.clembs.com/branding/crbt-2023/crbt-2023.webp',
	bannerThumbnailPath: '/assets/small-banners/crbt-2023.png',
} satisfies BlogPost;
