import type { BrandingPost } from '.';
import { TechnologyName } from '../technologies';

export const purplet2022: BrandingPost = {
	id: 'purplet-2022',
	brand: 'Purplet',
	title: 'Purplet: Next-gen tools to build modern Discord apps.',
	createdAt: new Date('2022-10-07'),
	finishedAt: new Date('2022-10-18'),
	links: { projectUrl: 'https://github.com/CRBT-Team/Purplet' },
	isCommission: false,
	technologies: [TechnologyName.XD, TechnologyName.Svelte],
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF',
	},
	tags: ['Collaboration', 'Software', 'Library', 'Discord', 'Branding'],
	brief:
		"Purplet began last year as a platform to create Discord bots using the JavaScript language on top of the Discord.js library, mainly developed and maintained by paperdave, and where I did all of the promotional stuff, and the branding. <br/>Since June 2022, we've expanded Purplet as an ecosystem of libraries for building modern Discord apps by leveraging Slash Commands and components, among other things. We've also put our efforts to work on a remake of the framework that features faster speeds and hot reloading, which allows developers to quickly shift between ideas as the bot commands reload when they make changes to them. <br/><br/>Ahead of Purplet 2 and all of the incredible tools we plan to deliver in the future, we have changed the look of Purplet to match our vision of making Discord applications. <br/>The small icon logo combines the silhouette of CRBT with a file icon, while the display icon retains the 3D look and adds a refresh icon to emphasize hot reloading, coming with Purplet 2. <br/>We updated the website & repo to match this new branding, and we hope you'll love it as much as we did!",
	assets: [
		['https://c.clembs.com/branding/purplet-2022/banner.png'],
		[
			'https://c.clembs.com/branding/purplet-2022/banner-colors.png',
			'https://c.clembs.com/branding/purplet-2022/headings.png',
		],
		['https://c.clembs.com/branding/purplet-2022/explanations.png'],
		[
			'https://c.clembs.com/branding/purplet-2022/colors.png',
			'https://c.clembs.com/branding/purplet-2022/icon-small.png',
		],
	],
	iconPath: 'https://c.clembs.com/branding/purplet-2022/favicon.svg',
	bannerPath: 'https://c.clembs.com/branding/purplet-2022/banner.png',
	bannerThumbnailPath: '/assets/small-banners/purplet-2022.png',
};
