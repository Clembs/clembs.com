import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const vbot: BrandingPost = {
	id: 'vbot',
	brand: 'Vbot',
	title: 'Vbot',
	createdAt: new Date('2021-06-13'),
	finishedAt: new Date('2021-06-13'),
	links: { projectUrl: 'https://user5522.tk/projects/vbot' },
	isCommission: true,
	technologies: [TechnologyName.XD],
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF',
	},
	tags: ['Entreprise', 'Software', 'Branding', 'UI', 'Web design'],
	brief:
		"I started CRBT in 2019 as my very first coding experiment, and over the years it's become more complete and defined, as a true multi-purpose Discord bot.<br>As the project evolved a lot the past year, its website needed a serious refresh to reflect it, and what the future holds for it.<br>Inspired by Material You, the new website features a clean and refined design that works on all screen sizes and themes.",
	assets: [],
	iconPath: 'https://c.clembs.com/branding/vbot/favicon.svg',
	bannerPath: 'https://c.clembs.com/branding/vbot/banner.png',
	bannerThumbnailPath: '/assets/small-banners/vbot.png',
};
