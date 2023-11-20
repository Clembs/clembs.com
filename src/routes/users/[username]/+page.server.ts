import { DISCORD_BOT_TOKEN } from '$env/static/private';
import { letterColors } from '$lib/components/GradientAvatar/letterColors.js';
import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { APIUser } from 'discord-api-types/v10.js';

export const load = async ({ params, parent, setHeaders }) => {
	if (!params.username) {
		throw error(400);
	}

	const user = await db.query.users.findFirst({
		where: ({ username }, { eq }) => eq(username, params.username!),
		with: {
			comments: {
				with: {
					parentComment: {
						with: {
							author: {
								columns: {
									id: true,
									username: true,
									badges: true,
								},
							},
						},
					},
					author: {
						columns: {
							id: true,
							username: true,
							badges: true,
						},
					},
					childComments: {
						with: {
							author: {
								columns: {
									id: true,
									username: true,
									badges: true,
								},
							},
						},
					},
					score: true,
					mentionedUsers: {
						with: {
							user: {
								columns: {
									id: true,
									username: true,
									badges: true,
								},
							},
						},
					},
				},
			},
		},
	});

	let discordData: APIUser | undefined = undefined;

	if (user?.discordUserId) {
		discordData = await (
			await fetch(`https://discord.com/api/users/${user.discordUserId}`, {
				headers: {
					Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
					'Cache-Control': 'public, max-age=c',
				},
			})
		).json();
	}

	if (!user) throw error(404);

	setHeaders({
		'Cache-Control': 'public, max-age=60',
	});

	return {
		user,
		...(await parent()),
		discordData,
		themeGradient: {
			from: letterColors[user.username[0]],
			to: letterColors[user.username[0]],
		},
	};
};
