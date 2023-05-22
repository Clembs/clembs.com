export enum SocialName {
	Discord = 'discord',
	Instagram = 'instagram',
	GitHub = 'github',
	Twitch = 'twitch',
	Twitter = 'twitter',
	YouTube = 'youtube'
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
		background: '#5865F2'
	},
	{
		id: SocialName.Twitch,
		name: 'Twitch',
		url: 'https://twitch.tv/clembs',
		background: '#9147FF'
	},
	{
		id: SocialName.GitHub,
		name: 'GitHub',
		url: 'https://github.com/clembs',
		background: '#202020'
	},
	{
		id: SocialName.Instagram,
		name: 'Instagram',
		url: 'https://instagram.com/clembs.v',
		background: '#FD0074'
	},
	{
		id: SocialName.Twitter,
		name: 'Twitter',
		url: 'https://twitter.com/clembsv',
		background: '#1D9BF0'
	},
	{
		id: SocialName.YouTube,
		name: 'YouTube',
		url: 'https://youtube.com/@clembsv',
		background: '#FF0000'
	}
] satisfies Social[];
