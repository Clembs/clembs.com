import type { BlogPost } from '..';

export default {
	id: 'clembs',
	categoryId: 'design',
	title: 'Clembs - Nice to meet you, again.',
	createdAt: new Date('2023-07-05'),
	links: { projectUrl: 'https://clembs.com' },
	themeGradient: {
		from: '#643FFF',
		to: '#31C0FF',
	},
	subtitle: 'Brand identity & UI/UX design',
	summary: 'Personal brand identity with assets for web, livestreaming, and everywhere that I am.',
	bannerPath: 'https://c.clembs.com/branding/clembs/clembs.webp',
	bannerThumbnailPath: '/assets/small-banners/clembs.png',
} satisfies BlogPost;
