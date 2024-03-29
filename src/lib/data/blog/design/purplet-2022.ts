import type { BlogPost } from '..';

export default {
	id: 'purplet-2022',
	categoryId: 'design',
	title: 'Purplet - Next-gen tools to build modern Discord apps.',
	createdAt: new Date('2022-10-18'),
	links: {
		projectUrl: 'https://purplet.js.org',
		instagram: 'https://www.instagram.com/p/Cj2GQwhA8tn/',
	},
	subtitle: 'Brand identity',
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF',
	},
	summary:
		'Ecosystem of libraries for building modern Discord apps with JavaScript, made by my friend Dave and I.',
	bannerPath: 'https://c.clembs.com/branding/purplet-2022/purplet-2022.webp',
	bannerThumbnailPath: '/assets/small-banners/purplet-2022.png',
} satisfies BlogPost;
