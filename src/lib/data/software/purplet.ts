import type { Software } from '.';

export const purplet: Software = {
	id: 'purplet',
	name: 'Purplet',
	brief: 'Masterfully crafted Discord-development libraries',
	createdAt: new Date('2021-10-14'),
	description: `Purplet is a Discord bot framework that splits your features into small, hot-reloadable modules, allowing you to move your focus to quickly building your bot ideas.<br><br>
	Our suite of packages is built from the ground up on Web Standards like fetch and WebSocket, allowing your code to run locally in Node.js, but with the ability to deploy your interaction handlers to Cloudflare Workers, greatly reducing costs while increasing scalability.<br><br>
	Full documentation on Purplet and how to get started is available at <a href="https://purplet.js.org">purplet.js.org</a>.`,
	iconPath: 'https://c.clembs.com/branding/purplet-2022/icon-small.png',
	iconThumbnailPath: 'https://c.clembs.com/branding/purplet-2022/icon-small.png',
	links: {
		projectUrl: 'https://purplet.js.org',
		repoUrl: 'https://github.com/CRBT-Team/Purplet',
	},
	themeGradient: {
		from: '#A172F8',
		to: '#D5C2FF',
	},
};
