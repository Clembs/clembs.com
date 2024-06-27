import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import { fetchMinecraftPlayer } from '../../../_helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const { player } = await fetchMinecraftPlayer(cookies);
	if (!player) {
		throw error(401, 'Unauthorized');
	}

	const team = await db.query.minecraftTeams.findFirst({
		where: ({ id, leader }, { and, eq }) => and(eq(id, params.id), eq(leader, player.username)),
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
