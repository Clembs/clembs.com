import Boosty from '$lib/icons/socials/boosty.svelte';
import Discord from '$lib/icons/socials/discord.svelte';
import Github from '$lib/icons/socials/github.svelte';
import Instagram from '$lib/icons/socials/instagram.svelte';
import KoFi from '$lib/icons/socials/ko-fi.svelte';
import Twitch from '$lib/icons/socials/twitch.svelte';
import Youtube from '$lib/icons/socials/youtube.svelte';
import { IconFileText, IconMail } from '@tabler/icons-svelte';
import Linkedin from '$lib/icons/socials/linkedin.svelte';
import type { ComponentType } from 'svelte';
import X from '$lib/icons/socials/x.svelte';
import Bluesky from '$lib/icons/socials/bluesky.svelte';

export interface Social {
	name: string;
	href: string;
	icon: ComponentType;
	username?: string;
	description?: string;
}

export const email: Social = {
	name: 'E-mail',
	href: 'mailto://clembs@clembs.com',
	username: 'clembs@clembs.com',
	icon: IconMail,
};

export const kofi: Social = {
	name: 'Ko-fi',
	href: 'https://ko-fi.com/clembs',
	icon: KoFi,
	description: 'One-time and monthly donations',
};

export const boosty: Social = {
	name: 'Boosty',
	href: 'https://boosty.to/clembs',
	icon: Boosty,
	description: 'If Ko-fi is not available in your country',
};

export const github: Social = {
	name: 'GitHub',
	href: 'https://github.com/Clembs',
	username: 'Clembs',
	icon: Github,
};

export const discord: Social = {
	name: 'Discord',
	href: 'https://discord.gg/6uNwP46',
	username: '@clembs',
	icon: Discord,
};

export const youtube: Social = {
	name: 'YouTube',
	href: 'https://youtube.com/@ClembsV',
	username: '@clembsv',
	icon: Youtube,
};

export const twitch: Social = {
	name: 'Twitch',
	href: 'https://twitch.tv/clembs',
	username: 'clembs',
	icon: Twitch,
};

export const instagram: Social = {
	name: 'Instagram',
	href: 'https://instagram.com/clembs.v',
	username: 'clembs.v',
	icon: Instagram,
};

export const linkedin: Social = {
	name: 'LinkedIn',
	href: 'https://www.linkedin.com/in/clembs/',
	username: 'Clément Voisin',
	icon: Linkedin,
};

export const resume: Social = {
	name: 'My CV',
	description: 'Disponible en français uniquement',
	href: 'https://c.clembs.com/files/389533db63ad437adb.pdf',
	icon: IconFileText,
};

export const twitter: Social = {
	name: 'X/Twitter',
	href: 'https://twitter.com/clembsv',
	username: '@clembsv',
	icon: X,
};

export const bluesky: Social = {
	name: 'Bluesky',
	href: 'https://bsky.app/profile/clembs.com',
	username: 'clembs.com',
	icon: Bluesky,
};

export const footerSocials = [bluesky, twitter, discord, github, linkedin] satisfies Social[];
