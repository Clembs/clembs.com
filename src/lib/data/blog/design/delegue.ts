import type { BlogPost } from '..';

export const hidden = {
	id: 'delegue',
	categoryId: 'design',
	title: 'Ensemble vers la réussite - Class rep campaign',
	createdAt: new Date('2022-09-16'),
	links: { projectUrl: 'https://delegue.clembs.com' },
	subtitle: 'Brand identity',
	themeGradient: {
		from: '#18C6F2',
		to: '#1877F2',
	},
	brief: '',
	bannerPath: 'https://c.clembs.com/branding/delegue/delegue.webp',
	bannerThumbnailPath: '/assets/small-banners/delegue.png',
} satisfies BlogPost;
