import type { BlogPost } from '..';

export const hidden = {
	id: 'vertical-vision',
	categoryId: 'design',
	brand: { name: 'Vertical Vision' },
	title: 'Vertical Vision - Watch your safety',
	createdAt: new Date('2023-12-01'),
	links: { projectUrl: 'https://verticalvision.fr' },
	subtitle: 'Brand identity & UI/UX design',
	themeGradient: {
		from: '#18C6F2',
		to: '#1877F2',
	},
	brief: 'Watch your safety',
	bannerPath: 'https://c.clembs.com/branding/vertical-vision/banner.png',
	bannerThumbnailPath: '/assets/small-banners/vertical-vision.png',
} satisfies BlogPost;
