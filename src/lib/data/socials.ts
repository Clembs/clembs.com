import Boosty from '$lib/icons/socials/boosty.svelte';
import Discord from '$lib/icons/socials/discord.svelte';
import Github from '$lib/icons/socials/github.svelte';
import Instagram from '$lib/icons/socials/instagram.svelte';
import KoFi from '$lib/icons/socials/ko-fi.svelte';
import Mastodon from '$lib/icons/socials/mastodon.svelte';
import Twitch from '$lib/icons/socials/twitch.svelte';
import Youtube from '$lib/icons/socials/youtube.svelte';
import { IconMail, IconMessageCircle, IconDroplet } from '@tabler/icons-svelte';
import Linkedin from '$lib/icons/socials/linkedin.svelte';
import type { ComponentType } from 'svelte';
import X from '$lib/icons/socials/x.svelte';
import Threads from '$lib/icons/socials/threads.svelte';
import Bluesky from '$lib/icons/socials/bluesky.svelte';

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
	LinkedIn = 'linkedin',
	Twitter = 'twitter',
	Threads = 'threads',
	Bluesky = 'bluesky',
}

export interface Social {
	id: SocialName;
	name: string;
	url: string;
	icon: ComponentType;
	activity?: 'low' | 'medium' | 'high';
	username?: string;
	description?: string;
}

export const email: Social = {
	id: SocialName.Email,
	name: 'E-mail',
	url: 'mailto://clembs@clembs.com',
	icon: IconMail,
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
	id: SocialName.Kofi,
	name: 'Water Aid',
	url: 'https://wateraid.org/donate',
	icon: IconDroplet,
	description: 'Donate to those who are in real need of water',
};

export const comments: Social = {
	id: SocialName.Clembs,
	name: 'clembs.com Comments',
	url: '/comments',
	icon: IconMessageCircle,
};

export const github: Social = {
	id: SocialName.GitHub,
	name: 'GitHub',
	url: 'https://github.com/Clembs',
	icon: Github,
};

export const discord: Social = {
	id: SocialName.Discord,
	name: 'Discord',
	url: 'https://discord.gg/6uNwP46',
	icon: Discord,
};

export const youtube: Social = {
	id: SocialName.YouTube,
	name: 'YouTube',
	url: 'https://youtube.com/@ClembsV',
	icon: Youtube,
};

export const twitch: Social = {
	id: SocialName.Twitch,
	name: 'Twitch',
	url: 'https://twitch.tv/clembs',
	icon: Twitch,
};

export const instagram: Social = {
	id: SocialName.Instagram,
	name: 'Instagram',
	url: 'https://instagram.com/clembs.v',
	icon: Instagram,
};

export const mastodon: Social = {
	id: SocialName.Mastodon,
	name: 'Mastodon',
	url: 'https://mastodon.social/@clembs',
	icon: Mastodon,
};

export const linkedin: Social = {
	id: SocialName.LinkedIn,
	name: 'LinkedIn',
	url: 'https://www.linkedin.com/in/clembs/',
	icon: Linkedin,
};

export const twitter: Social = {
	id: SocialName.Twitter,
	name: 'X/Twitter',
	url: 'https://twitter.com/clembsv',
	icon: X,
};

export const threads: Social = {
	id: SocialName.Threads,
	name: 'Threads',
	url: 'https://threads.net/@clembs.v/',
	icon: Threads,
};

export const bluesky: Social = {
	id: SocialName.Bluesky,
	name: 'Bluesky',
	url: 'https://bsky.app/profile/clembs.com',
	icon: Bluesky,
};

export const donationLinks = [kofi, boosty, waterAid] satisfies Social[];

export const socials = [
	// {
	// 	id: SocialName.Fiverr,
	// 	name: 'Fiverr',
	// 	url: 'https://www.fiverr.com/clembs',
	// 	background: '#1DBF73',
	// },
	github,
	instagram,
] satisfies Social[];

export const chatting = [email, discord, comments] satisfies Social[];

export const microblogging = [bluesky, twitter, linkedin] satisfies Social[];

export const streamSocials = [youtube, twitch] satisfies Social[];
