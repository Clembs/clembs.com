import { HABILE_SECRET } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';

export const GET: RequestHandler = async ({ request }) => {
	const secret = request.headers.get('Authorization');
	const userId = request.headers.get('X-User-Id');

	if (secret !== HABILE_SECRET) throw error(401, 'Invalid secret');
	if (!userId) throw error(401, 'Invalid user id');

	const userData = await db.query.users.findFirst({
		where: ({ discordUserId }, { eq }) => eq(discordUserId, userId),
		columns: {
			username: true,
			habileChatData: true,
		},
	});

	if (!userData) throw error(404, 'User not found');

	return json(userData.habileChatData);
};
