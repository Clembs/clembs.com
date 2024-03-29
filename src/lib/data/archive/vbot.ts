import type { BlogPost } from '../blog';

export default {
	id: 'vbot',
	categoryId: 'design',
	brand: {
		name: 'Vbot',
	},
	title: 'Vbot',
	createdAt: new Date('2021-06-13'),
	links: { projectUrl: 'https://user5522.tk/projects/vbot' },
	subtitle: 'Brand identity',
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF',
	},
	summary:
		"I started CRBT in 2019 as my very first coding experiment, and over the years it's become more complete and defined, as a true multi-purpose Discord bot.<br>As the project evolved a lot the past year, its website needed a serious refresh to reflect it, and what the future holds for it.<br>Inspired by Material You, the new website features a clean and refined design that works on all screen sizes and themes.",
	bannerPath: 'https://c.clembs.com/branding/vbot/banner.png',
	bannerThumbnailPath: '/assets/small-banners/vbot.png',
} satisfies BlogPost;
