import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const username = url.searchParams.get('username');
	const withUuid = url.searchParams.get('withUuid');

	if (!username || !username.trim() || username.trim().length < 3) {
		throw error(400, 'No username provided');
	}

	const existingUser = await db.query.minecraftPlayers.findFirst({
		where: ({ username: mcUsername }, { eq }) => eq(mcUsername, username),
	});

	if (existingUser) {
		throw error(400, 'Username already registered');
	}

	if (!withUuid) {
		return new Response(null, { status: 204 });
	}

	const req = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);

	if (!req.ok) {
		throw error(400, 'Username not found');
	}

	const data = await req.json();

	if (!data) {
		throw error(400, 'Username not found');
	}

	return new Response(data.id);
};
