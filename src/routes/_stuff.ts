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
		name: 'Acknowledgements',
		link: '/gh/Acknowledgements',
		desc: 'A CLI tool to credit your dependencies in a plethora of ways.'
	},
	{
		name: 'StreamThings',
		link: '/gh/StreamThings',
		desc: 'A bunch of widgets, a Twitch chatbot with its framework. Undocumented and for private use mainly.'
	}
];

export const socials = `
Twitch
Discord
Buy Me A Coffee
YouTube
GitHub
Twitter
Guilded
Instagram
Reddit
GameJolt
npm
itch.io
SoundCloud
Steam
OnlyFans
Spotify
`
	.split('\n')
	.filter(Boolean)
	.map((el) => {
		const clean = el.toLowerCase().replace(/ |\./g, '');
		return {
			name: el,
			clean,
			icon_url: `/assets/${clean}.svg`,
			link: `/${clean}`
		};
	});
