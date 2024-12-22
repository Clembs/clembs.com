import type { Article } from '..';

export default {
	slug: 'kikuri',
	categoryId: 'work',
	brand: {
		name: 'Kikuri',
		iconPath: 'https://c.clembs.com/branding/kikuri/avatar.webp',
	},
	title: 'Kikuri - The fun and casual card collecting Discord bot.',
	createdAt: new Date('2023-06-23'),
	links: {
		projectUrl: 'https://www.behance.net/gallery/173728135/Kikuri-web-design-UIUX',
	},
	subtitle: 'UI/UX design',
	summary:
		'Anime-themed card-collecting Discord bot where users collect cards to use them for combat against other users.',
	bannerPath: 'https://c.clembs.com/branding/kikuri/kikuri.webp',
	bannerThumbnailPath: '/assets/small-banners/kikuri.png',
} satisfies Article;
