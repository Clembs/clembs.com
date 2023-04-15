import type { BrandingPost } from '../branding';

export const vbot: BrandingPost = {
	id: 'vbot',
	brand: 'Vbot',
	title: 'Vbot',
	createdAt: new Date('2021-06-13'),
	finishedAt: new Date('2021-06-13'),
	url: 'https://website-git-dev-user5522.vercel.app/projects/vbot',
	isCommission: true,
	technologies: ['xd'],
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF'
	},
	tags: ['Entreprise', 'Software', 'Branding', 'UI', 'Web design'],
	brief:
		"I started CRBT in 2019 as my very first coding experiment, and over the years it's become more complete and defined, as a true multi-purpose Discord bot.<br>As the project evolved a lot the past year, its website needed a serious refresh to reflect it, and what the future holds for it.<br>Inspired by Material You, the new website features a clean and refined design that works on all screen sizes and themes.",
	iconPath: '/favicon.svg',
	assets: [
		['/banner.png'],
		['/banner-colors.png', '/headings.png'],
		['/explanations.png'],
		['/colors.png', '/icon-small.png']
	],
	bannerPath: '/banner.png'
};
