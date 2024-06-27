import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchMinecraftPlayer } from '../_server-helpers';
import { db } from '$lib/db';
import { minecraftPlayers } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies }) => {
	const { player } = await fetchMinecraftPlayer(cookies);

	if (!player) {
		throw redirect(303, '/smp/register');
	}

	const teams = await db.query.minecraftTeams.findMany({
		with: {
			leader: true,
			members: true,
		},
	});

	const currentTeam = teams.find((t) => t.id === player.teamId);

	return {
		currentTeam,
		teams: teams.map((t) => ({ ...t, passcode: t.passcode ? 'o' : undefined })),
		navButton: {
			href: '/smp',
			label: 'Habile SMP',
		},
	};
};

export const actions = {
	async default({ request, cookies }) {
		const { player } = await fetchMinecraftPlayer(cookies);
		if (!player) {
			throw redirect(303, '/smp/register');
		}

		if (player.teamId) {
			return fail(404, { message: 'You are already in a team' });
		}

		const formData = await request.formData();
		const teamId = formData.get('team-id')?.toString();
		if (!teamId) return fail(400, { message: 'Bad Request' });

		const team = await db.query.minecraftTeams.findFirst({
			where: ({ id }, { eq }) => eq(id, teamId),
		});

		if (!team) return fail(404, { message: 'Not found' });

		if (team.passcode) {
			const passcode = formData.get('passcode')?.toString();

			if (!passcode || passcode.length !== 6) {
				return fail(400, { message: 'Passcode should be 6 characters long' });
			}

			if (team.passcode !== passcode) {
				return fail(400, { message: 'Invalid passcode' });
			}
		}

		await db
			.update(minecraftPlayers)
			.set({
				teamId: team.id,
			})
			.where(eq(minecraftPlayers.username, player.username));

		return {
			success: true,
		};
	},
};
