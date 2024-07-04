import { redirect } from '@sveltejs/kit';
import { fetchMinecraftPlayer } from '../_server-helpers';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { minecraftPlayers } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const { player } = await fetchMinecraftPlayer(cookies);

	if (!player) {
		redirect(303, '/smp/register');
	}

	if (!player.teamId) {
		redirect(303, '/smp/teams');
	}

	const team = await db.query.minecraftTeams.findFirst({
		where: ({ id }, { eq }) => eq(id, player.teamId!),
		with: {
			leader: true,
			members: true,
		},
	});

	if (!team) {
		redirect(303, '/smp/teams');
	}

	return {
		team,
		isLeader: team.leader.username === player.username,
		newMember: !!url.searchParams.has('welcome'),
		navButton: {
			href: '/smp',
			label: 'Habile SMP',
		},
	};
};

export const actions: Actions = {
	async leave({ cookies }) {
		const { player } = await fetchMinecraftPlayer(cookies);

		if (!player) {
			redirect(303, '/smp/register');
		}

		if (!player.teamId) {
			redirect(303, '/smp/teams');
		}

		await db
			.update(minecraftPlayers)
			.set({ teamId: null })
			.where(eq(minecraftPlayers.username, player.username));

		redirect(303, '/smp/teams');
	},
};
