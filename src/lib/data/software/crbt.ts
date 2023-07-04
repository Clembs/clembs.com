import type { Software } from '.';

export const crbt: Software = {
	id: 'crbt',
	name: 'CRBT',
	category: 'Multipurpose Discord bot',
	createdAt: new Date('2019-07-02'),
	description: `CRBT is a Discord bot that helps you get things done quickly through user-friendly and customizable commands.<br><br>
It features seemingly everything you'd ask a Discord bot to do, like welcoming new members with custom messages and actions or creating intuitive and modern menus for self-assignable roles.<br><br>
It also has stuff you wish was built into Discord, like polls, giveaways or reminders! And they work almost like if they were native, you'll love them!<br><br>
CRBT is easy to use, regardless of your language! More than 9 languages are (more or less) supported thanks to fan translations, ensuring you can make understand the bot without the language barrier getting in the way.`,
	iconPath:
		'https://cdn.discordapp.com/avatars/595731552709771264/90f936a706b20f0798eb271bd16308d3.png?size=2048',
	iconThumbnailPath:
		'https://cdn.discordapp.com/avatars/595731552709771264/90f936a706b20f0798eb271bd16308d3.webp?size=256',
	gallery: [
		'https://media.discordapp.net/attachments/1070375756477255732/1070376036203765811/Web_1280_8.png',
		'https://media.discordapp.net/attachments/1070375756477255732/1070376035859841085/Web_1280_7.png',
		'https://media.discordapp.net/attachments/1070375756477255732/1070376036203765811/Web_1280_8.png',
	],
	links: {
		projectUrl: 'https://crbt.app',
		repoUrl: 'https://github.com/CRBT-Team/CRBT',
	},
	themeGradient: {
		from: '#FFCEDF',
		to: '#A62541',
	},
};
