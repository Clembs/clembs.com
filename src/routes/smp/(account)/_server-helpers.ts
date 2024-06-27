import { db } from '$lib/db';
import type { Cookies } from '@sveltejs/kit';

export async function fetchMinecraftPlayer(cookies: Cookies) {
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
