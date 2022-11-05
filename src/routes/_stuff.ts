import { brandIcons } from '$lib/icons/brands/_allIcons';

export const projects = [
	{
		name: 'CRBT',
		link: '/crbt',
		desc: 'A multipurpose smart Discord application designed for your server.'
	},
	{
		name: 'Plasmata',
		link: '/plasmata',
		desc: 'An action PvP mobile game with collectable characters.'
	},
	{
		name: 'Habile',
		link: '/gh/StreamThings',
		desc: 'A Twitch chatbot, and a Discord helper bot for private use on my server and channel.'
	},
	{
		name: 'Acknowledgements',
		link: '/gh/Acknowledgements',
		desc: 'A CLI tool to credit your dependencies automatically, or other things manually.'
	}
	// {
	// 	name: 'StreamThings',
	// 	link: '/gh/StreamThings',
	// 	desc: 'A bunch of widgets, a Twitch chatbot with its framework. Undocumented and for private use mainly.'
	// }
];

export const socials = Object.keys(brandIcons).map((el) => {
	const clean = el.toLowerCase().replace(/ |\./g, '');
	return {
		name: el,
		clean,
		icon_url: `/assets/${clean}.svg`,
		link: `/${clean}`
	};
});
