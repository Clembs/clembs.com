import { db } from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { minecraftPlayers } from '$lib/db/schema';

export const POST: RequestHandler = async ({ request, fetch, cookies }) => {
	const data = await request.json();
	if (!data) {
		throw error(400, 'Bad Request');
	}

	const { username, type, uuid } = data;

	if (!username || !username.trim() || username.trim().length < 3) {
		throw error(400, 'No username provided');
	}
	if (uuid) {
		if (uuid.length !== 32) {
			throw error(400, 'No UUID provided');
		}
		const validUnameReq = await fetch(`/smp/register/check?username=${username}&withUuid=true`);
		if (!validUnameReq.ok) {
			throw error(400, 'Invalid username');
		}
		const validUname = await validUnameReq.text();
		if (validUname !== uuid) {
			throw error(400, 'Mismatched UUID');
		}
	}
	if (!type || !['premium', 'cracked'].includes(type)) {
		throw error(400, 'Invalid account type');
	}
	const password = Math.random().toString(36).slice(2, 10);

	await db.insert(minecraftPlayers).values({
		uuid,
		username: username.trim(),
		type,
		password,
	});

	cookies.set('smp_player_data', JSON.stringify({ username, password }), {
		path: '/smp',
	});

	return json({ password });
};
