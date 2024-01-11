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

export const kofi: Social = {
	id: SocialName.Kofi,
	name: 'Ko-fi',
	url: 'https://ko-fi.com/clembs',
	icon: KoFi,
	description: 'Recommended. Supports one-time and monthly donations',
};

export const boosty: Social = {
	id: SocialName.Boosty,
	name: 'Boosty',
	url: 'https://boosty.to/clembs',
	icon: Boosty,
	description: 'If Ko-fi is not available in your country',
};

export const waterAid: Social = {
	name: 'Water Aid',
	url: 'https://wateraid.org/donate',
	icon: IconDroplet,
	description: 'Donate to those who are in real need of water',
};

export const comments: Social = {
	id: SocialName.Clembs,
	name: 'My comments section <3',
	url: '/comments',
	icon: IconMessageCircle,
	activity: 'high',
	username: 'Clembs',
};

export const github: Social = {
	id: SocialName.GitHub,
	name: 'GitHub',
	url: 'https://github.com/Clembs',
	icon: Github,
	activity: 'high',
	username: 'Clembs',
};

export const discord: Social = {
	id: SocialName.Discord,
	name: 'Discord',
	url: 'https://discord.gg/6uNwP46',
	icon: Discord,
	activity: 'medium',
	username: "Habile's Lounge",
};

export const youtube: Social = {
	id: SocialName.YouTube,
	name: 'YouTube',
	url: 'https://youtube.com/@ClembsV',
	icon: Youtube,
	activity: 'low',
	username: '@ClembsV',
};

export const twitch: Social = {
	id: SocialName.Twitch,
	name: 'Twitch',
	url: 'https://twitch.tv/clembs',
	icon: Twitch,
	activity: 'low',
	username: 'Clembs',
};

export const instagram: Social = {
	id: SocialName.Instagram,
	name: 'Instagram',
	url: 'https://instagram.com/clembs.v',
	icon: Instagram,
	activity: 'low',
	username: '@clembs.v',
};

export const mastodon: Social = {
	id: SocialName.Mastodon,
	name: 'Mastodon',
	url: 'https://mastodon.social/@clembs',
	icon: Mastodon,
	activity: 'low',
	username: '@clembs@mastodon.social',
};

export const donationLinks = [kofi, boosty, waterAid] satisfies Social[];

export const socials = [
	// {
	// 	id: SocialName.Fiverr,
	// 	name: 'Fiverr',
	// 	url: 'https://www.fiverr.com/clembs',
	// 	background: '#1DBF73',
	// },
	comments,
	github,
	discord,
	youtube,
	twitch,
	instagram,
	mastodon,
] satisfies Social[];

export const streamSocials = [youtube, twitch] satisfies Social[];
