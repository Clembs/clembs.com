import type { BlogPost } from '..';

export default {
	id: 'kikuri',
	categoryId: 'design',
	brand: {
		name: 'Kikuri',
		iconPath: 'https://c.clembs.com/branding/kikuri/avatar.webp',
	},
	title: 'Kikuri - The fun and casual card collecting Discord bot.',
	createdAt: new Date('2023-06-23'),
	links: {
		instagram: 'https://www.instagram.com/p/Ct2cethNRBM/',
		behance: 'https://www.behance.net/gallery/173728135/Kikuri-web-design-UIUX',
		dribbble: 'https://dribbble.com/shots/21825728-Kikuri-web-design-UI-UX',
	},
	subtitle: 'UI/UX design',
	themeGradient: {
		from: '#BA3F3D',
		to: '#5D1C3C',
	},
	summary:
		'Anime-themed card-collecting Discord bot where users collect cards to use them for combat against other users.',
	bannerPath: 'https://c.clembs.com/branding/kikuri/kikuri.webp',
	bannerThumbnailPath: '/assets/small-banners/kikuri.png',
} satisfies BlogPost;
