import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import { fetchMinecraftPlayer } from '../../../_server-helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
	const { player } = await fetchMinecraftPlayer(cookies);
	const teamId = url.searchParams.get('teamId');

	if (!player) {
		throw error(401, 'Unauthorized');
	}
	if (!teamId) {
		throw error(404, 'Not found');
	}

	const team = await db.query.minecraftTeams.findFirst({
		where: ({ id, leader }, { and, eq }) => and(eq(id, teamId), eq(leader, player.username)),
	});

	if (!team) {
		throw error(404, 'Not found');
	}

	return {
		navButton: {
			href: '/smp',
			label: 'Habile SMP',
		},
		team,
	};
};
