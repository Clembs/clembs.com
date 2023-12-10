import Boosty from '$lib/icons/socials/boosty.svelte';
import Discord from '$lib/icons/socials/discord.svelte';
import Github from '$lib/icons/socials/github.svelte';
import Instagram from '$lib/icons/socials/instagram.svelte';
import KoFi from '$lib/icons/socials/ko-fi.svelte';
import Mastodon from '$lib/icons/socials/mastodon.svelte';
import Twitch from '$lib/icons/socials/twitch.svelte';
import Youtube from '$lib/icons/socials/youtube.svelte';
import IconMail from '@tabler/icons-svelte/dist/svelte/icons/IconMail.svelte';
import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
import IconDroplet from '@tabler/icons-svelte/dist/svelte/icons/IconDroplet.svelte';

export enum SocialName {
	Kofi = 'ko-fi',
	Boosty = 'boosty',
	// Fiverr = 'fiverr',
	Email = 'email',
	Discord = 'discord',
	Instagram = 'instagram',
	Clembs = 'clembs',
	GitHub = 'github',
	Twitch = 'twitch',
	Mastodon = 'mastodon',
	YouTube = 'youtube',
}

export interface Social {
	id?: SocialName;
	name: string;
	url: string;
	icon: any;
	activity?: 'low' | 'medium' | 'high';
	username?: string;
	description?: string;
}

export const email: Social = {
	id: SocialName.Email,
	name: 'E-mail',
	url: 'mailto://clembs@clembs.com',
	icon: IconMail,
	activity: 'high',
	username: 'clembs@clembs.com',
};

export const donationLinks = [
	{
		id: SocialName.Kofi,
		name: 'Ko-fi',
		url: 'https://ko-fi.com/clembs',
		icon: KoFi,
		description: 'Recommended. Supports one-time and monthly donations',
	},
	{
		id: SocialName.Boosty,
		name: 'Boosty',
		url: 'https://boosty.to/clembs',
		icon: Boosty,
		description: 'If Ko-fi is not available in your country',
	},
	{
		name: 'Water Aid',
		url: 'https://wateraid.org/donate',
		icon: IconDroplet,
		description: 'Donate to those who are in real need of water',
	},
] satisfies Social[];

export const socials = [
	// {
	// 	id: SocialName.Kofi,
	// 	name: 'Ko-fi',
	// 	url: 'https://ko-fi.com/clembs',
	// 	icon: KoFi,
	// },
	// {
	// 	id: SocialName.Fiverr,
	// 	name: 'Fiverr',
	// 	url: 'https://www.fiverr.com/clembs',
	// 	background: '#1DBF73',
	// },
	{
		id: SocialName.Clembs,
		name: 'My comments section <3',
		url: '/comments',
		icon: IconMessageCircle,
		activity: 'high',
		username: 'Clembs',
	},
	{
		id: SocialName.GitHub,
		name: 'GitHub',
		url: 'https://github.com/Clembs',
		icon: Github,
		activity: 'high',
		username: 'Clembs',
	},
	{
		id: SocialName.Discord,
		name: 'Discord',
		url: 'https://discord.gg/6uNwP46',
		icon: Discord,
		activity: 'medium',
		username: "Habile's Lounge",
	},
	{
		id: SocialName.YouTube,
		name: 'YouTube',
		url: 'https://youtube.com/@ClembsV',
		icon: Youtube,
		activity: 'low',
		username: '@ClembsV',
	},
	{
		id: SocialName.Twitch,
		name: 'Twitch',
		url: 'https://twitch.tv/clembs',
		icon: Twitch,
		activity: 'low',
		username: 'Clembs',
	},
	{
		id: SocialName.Instagram,
		name: 'Instagram',
		url: 'https://instagram.com/clembs.v',
		icon: Instagram,
		activity: 'low',
		username: '@clembs.v',
	},
	{
		id: SocialName.Mastodon,
		name: 'Mastodon',
		url: 'https://mastodon.social/@clembs',
		icon: Mastodon,
		activity: 'low',
		username: '@clembs@mastodon.social',
	},
] satisfies Social[];
