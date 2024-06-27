import { db } from '$lib/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchMinecraftPlayer } from '../../_server-helpers';
import { minecraftPlayers, minecraftTeams } from '$lib/db/schema';
import { colors } from '../../_helpers';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ parent }) => {
	const teams = await db.query.minecraftTeams.findMany();
	const { player } = await parent();

	if (player?.teamId) redirect(303, '/smp');

	return {
		navButton: {
			href: '/smp/register',
			label: 'Register',
		},
		usedColors: teams.map((t) => t.color),
	};
};

export const actions = {
	async default({ request, cookies }) {
		const { player } = await fetchMinecraftPlayer(cookies);

		if (!player) {
			error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const color = formData.get('color')?.toString();
		const passcode = formData.get('invite-code')?.toString();

		if (!name?.trim() || name.trim().length < 3 || name.trim().length > 16) {
			return fail(400, { message: 'Bad Request' });
		}

		const existingTeam = await db.query.minecraftTeams.findFirst({
			where: ({ name: dbName }, { eq }) => eq(dbName, name.trim()),
		});

		if (existingTeam) {
			return fail(400, { message: 'This team name is already taken' });
		}

		if (!color || colors.every((c) => c.name !== color)) {
			return fail(400, { message: 'Bad Request' });
		}
		if (passcode && passcode.length !== 6) {
			return fail(400, { message: 'The passcode must be 6 characters long' });
		}

		const [team] = await db
			.insert(minecraftTeams)
			.values({
				name: name?.trim(),
				color,
				leader: player.username,
				passcode,
			})
			.returning();

		await db
			.update(minecraftPlayers)
			.set({
				teamId: team.id,
			})
			.where(eq(minecraftPlayers.username, player.username));

		redirect(303, `/smp/teams/create/success?teamId=${team.id}`);
	},
};
