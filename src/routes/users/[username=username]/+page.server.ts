import { letterColors } from '$lib/components/GradientAvatar/letterColors.js';
import { db } from '$lib/db';
import { error } from '@sveltejs/kit';

export const load = async ({ params, parent }) => {
	if (!params.username) {
		throw error(400);
	}

	const user = await db.query.users.findFirst({
		where: ({ username }, { eq }) => eq(username, params.username!),
		with: {
			comments: {
				with: {
					parentComment: true,
					author: true,
					childComments: {
						with: {
							author: true,
						},
					},
					score: true,
					mentionedUsers: {
						with: {
							user: true,
						},
					},
				},
			},
		},
	});

	if (!user) {
		throw error(500);
	}

	return {
		user,
		...(await parent()),
		themeGradient: {
			from: letterColors[user.username[0]],
			to: letterColors[user.username[0]],
		},
	};
};
