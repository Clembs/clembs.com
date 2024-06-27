import { redirect } from '@sveltejs/kit';
import { fetchMinecraftPlayer } from '../_server-helpers';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ cookies }) => {
	const { player } = await fetchMinecraftPlayer(cookies);

	if (player) {
		redirect(303, '/smp');
	}

	return {
		navButton: {
			href: '/smp',
			label: 'Habile SMP',
		},
	};
};

export const actions = {
	async default({ request, cookies }) {
		const { player } = await fetchMinecraftPlayer(cookies);

		if (player) {
			redirect(303, '/smp');
		}

		const formData = await request.formData();
		const username = formData.get('username')?.toString();
		const password = formData.get('password')?.toString();

		if (!username || !password) {
			return { status: 400, body: { message: 'Bad Request' } };
		}

		const existingPlayer = await db.query.minecraftPlayers.findFirst({
			where: ({ username: dbUsername, password: dbPassword }, { eq, and }) =>
				and(eq(dbUsername, username), eq(dbPassword, password)),
		});

		if (!existingPlayer) {
			return { status: 401, body: { message: 'Invalid credentials' } };
		}

		cookies.set('smp_player_data', JSON.stringify({ username, password }), {
			path: '/smp',
		});

		redirect(303, '/smp/teams');
	},
};
