import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';
import { streams } from '$lib/db/schema';
import { socials } from '$lib/data/socials';
import { DISCORD_STREAM_WEBHOOK_URL, DISCORD_TOKEN } from '$env/static/private';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals: { getUserData }, parent }) => {
	const userData = await getUserData();

	if (!userData?.badges?.includes('CLEMBS')) {
		throw error(403, 'You are not allowed to access this page');
	}

	const streams = await db.query.streams.findMany();

	return {
		streams,
		...(await parent()),
		navButton: {
			href: '/stream',
			label: 'Streams',
		},
	};
};

export const actions: Actions = {
	createStream: async ({ locals: { getUserData }, request, fetch }) => {
		const userData = await getUserData();

		if (!userData?.badges?.includes('CLEMBS')) {
			throw error(403, 'You are not allowed to access this page');
		}

		const formData = await request.formData();

		console.log(formData);

		const title = formData.get('title')?.toString();
		const platforms = formData.getAll('platforms');
		const startTime = formData.get('startTime')?.toString();
		const discordEvent = formData.get('discordEvent')?.toString();
		const collaboratorNames = formData.getAll('collaborator:name');
		const collaboratorUrls = formData.getAll('collaborator:url');

		if (!title || !platforms || !startTime) {
			throw error(400, 'Missing required fields');
		}

		const startedAt = new Date(new Date(startTime).getTime() + 60 * 60 * 1000);

		const stream = await db.insert(streams).values({
			title,
			startedAt,
			platforms: platforms.map((platform) => ({
				id: platform.toString(),
				url: formData.get(`${platform}:url`)?.toString()!,
			})),
			collaborators: collaboratorNames
				.filter((name) => !!name?.toString())
				.map((name, i) => ({
					url: collaboratorUrls[i]?.toString() ?? '',
					username: name?.toString() ?? '',
				})),
		});

		if (discordEvent === 'on') {
			const eventReq = await fetch(
				'https://discord.com/api/guilds/738747595438030888/scheduled-events',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bot ${DISCORD_TOKEN}`,
					},
					body: JSON.stringify({
						name: `🔴 ${title}`,
						description: formData.get('description')?.toString() ?? '',
						entity_metadata: {
							location: 'https://dev.clembs.com/stream',
						},
						privacy_level: 2,
						scheduled_start_time: startedAt.toISOString(),
						scheduled_end_time: new Date(
							formData.get('endTime')?.toString() ?? startedAt.getTime() + 60 * 60 * 1000
						).toISOString(),
						entity_type: 3,
					}),
				}
			);

			console.log(await eventReq.json());

			await fetch(DISCORD_STREAM_WEBHOOK_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: `🔴 **${title}** is scheduled to start on <t:${
						startedAt.getTime() / 1000
					}> (<t:${startedAt.getTime() / 1000}:R>)\nWatch on ${platforms
						.map((p) => socials.find((v) => v.id === p.toString())?.name)
						.join(' & ')}: https://dev.clembs.com/stream`,
				}),
			});
		}
	},
	updateStreamState: async ({ locals: { getUserData }, request }) => {
		const userData = await getUserData();

		if (!userData?.badges?.includes('CLEMBS')) {
			throw error(403, 'You are not allowed to access this page');
		}

		const formData = await request.formData();
		const streamId = formData.get('streamId')?.toString()!;
		const newState = formData.get('newState')?.toString()!;

		console.log({ streamId, newState });

		await db
			.update(streams)
			.set({
				state: newState as any,
			})
			.where(eq(streams.id, streamId));

		return { success: true };
	},
};
