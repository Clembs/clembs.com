export interface BrandingPost {
	id: string;
	projectName: string;
	title: string;
	tags: string[];
	type: 'branding' | 'ui';
	bannerPath: string;
	iconPath: string;
	wordmarkPath?: string;
	description: string;
	review?: string;
	assetsZipPath?: string;
	productURL?: string;
	assets: string[][];
	finishedAt: Date;
	createdAt: Date;
	themeColors: {
		background: string;
		accent: string;
		theme: 'light' | 'dark';
	};
	credits?: {
		href: string;
		label: string;
	}[];
}

export const brandingData: BrandingPost[] = [
	{
		id: 'purplet-2022',
		projectName: 'Purplet',
		title: 'Purplet Rebrand 2022',
		type: 'branding',
		createdAt: new Date('2022-10-07'),
		finishedAt: new Date('2022-10-18'),
		productURL: 'https://github.com/CRBT-Team/Purplet',
		wordmarkPath: '/wordmark-big.png',
		themeColors: {
			accent: '#A172F8',
			background: '#D5C2FF',
			theme: 'light'
		},
		tags: ['CRBT', 'Software'],
		description:
			"Purplet began last year as a platform to create Discord bots using the JavaScript language on top of the Discord.js library, mainly developed and maintained by paperdave, and where I did all of the promotional stuff, and the branding. <br/>Since June 2022, we've expanded Purplet as an ecosystem of libraries for building modern Discord apps by leveraging Slash Commands and components, among other things. We've also put our efforts to work on a remake of the framework that features faster speeds and hot reloading, which allows developers to quickly shift between ideas as the bot commands reload when they make changes to them. <br/><br/>Ahead of Purplet 2 and all of the incredible tools we plan to deliver in the future, we have changed the look of Purplet to match our vision of making Discord applications. <br/>The small icon logo combines the silhouette of CRBT with a file icon, while the display icon retains the 3D look and adds a refresh icon to emphasize hot reloading, coming with Purplet 2. <br/>We updated the website & repo to match this new branding, and we hope you'll love it as much as we did!",
		iconPath: '/favicon.svg',
		assets: [
			['/banner.png'],
			['/banner-colors.png', '/headings.png'],
			['/explanations.png'],
			['/colors.png', '/icon-small.png']
		],
		credits: [
			{
				href: 'https://paperdave.net',
				label: 'Dave Caruso'
			}
		],
		bannerPath: '/banner.png'
	}
];
