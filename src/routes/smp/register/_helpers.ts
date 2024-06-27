import type { Cookies } from '@sveltejs/kit';

export async function fetchMinecraftPlayer(cookies: Cookies) {
	const { db } = await import('$lib/db');
	const playerData = cookies.get('smp_player_data');
	if (!playerData)
		return {
			player: null,
		};

	const { username, password } = JSON.parse(decodeURI(playerData));
	if (!username || !password)
		return {
			player: null,
		};

	const player = await db.query.minecraftPlayers.findFirst({
		where: ({ username: dbUname, password: dbPwd }, { and, eq }) =>
			and(eq(dbUname, username), eq(dbPwd, password)),
	});
	if (!player)
		return {
			player: null,
		};

	return {
		player,
	};
}

export const colors = [
	{ name: 'dark_red', hex: '#be0000' },
	{ name: 'red', hex: '#fe3f3f' },
	{ name: 'gold', hex: '#d9a334' },
	{ name: 'yellow', hex: '#fefe3f' },
	{ name: 'dark_green', hex: '#00be00' },
	{ name: 'green', hex: '#3ffe3f' },
	{ name: 'aqua', hex: '#3ffefe' },
	{ name: 'dark_aqua', hex: '#00bebe' },
	{ name: 'dark_blue', hex: '#0000be' },
	{ name: 'blue', hex: '#3f3ffe' },
	{ name: 'light_purple', hex: '#fe3ffe' },
	{ name: 'dark_purple', hex: '#be00be' },
];
