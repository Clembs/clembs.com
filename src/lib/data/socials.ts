export enum SocialName {
	Discord = 'discord',
	Instagram = 'instagram',
	GitHub = 'github',
	Twitch = 'twitch',
	Mastodon = 'mastodon',
	YouTube = 'youtube',
}

export interface Social {
	id: SocialName;
	name: string;
	url: string;
	background: string;
}

export const socials = [
	{
		id: SocialName.Discord,
		name: 'Discord',
		url: 'https://discord.gg/6uNwP46',
		background: '#5865F2',
	},
	{
		id: SocialName.Twitch,
		name: 'Twitch',
		url: 'https://twitch.tv/clembs',
		background: '#9147FF',
	},
	{
		id: SocialName.GitHub,
		name: 'GitHub',
		url: 'https://github.com/clembs',
		background: '#202020',
	},
	{
		id: SocialName.Instagram,
		name: 'Instagram',
		url: 'https://instagram.com/clembs.v',
		background: '#FD0074',
	},
	{
		id: SocialName.Mastodon,
		name: 'Mastodon',
		url: 'https://mastodon.social/@clembs',
		background: '#6364FF',
	},
] satisfies Social[];
