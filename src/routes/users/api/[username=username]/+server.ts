import { db } from '$lib/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.username) {
		throw error(400);
	}

	const user = await db.query.users.findFirst({
		where: ({ username }, { eq }) => eq(username, params.username!),
		with: {
			comments: {
				with: {
					author: true,
					childComments: {
						with: {
							author: true,
						},
					},
					mentionedUsers: {
						with: {
							user: true,
						},
					},
					score: true,
				},
			},
		},
	});

	if (!user) {
		throw error(500);
	}

	return json(user);
};
