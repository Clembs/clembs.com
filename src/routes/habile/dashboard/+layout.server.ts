import type { APIUser } from 'discord-api-types/v10';
import type { LayoutServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import { DISCORD_BOT_TOKEN } from '$env/static/private';

export const load: LayoutServerLoad = async ({ parent, getClientAddress, fetch }) => {
	const parentData = await parent();

	if (!parentData.userData) {
		throw redirect(303, '/settings');
	}

	let discordData: APIUser | null = null;

	if (parentData.userData.discordUserId) {
		discordData = await (
			await fetch(`https://discord.com/api/users/${parentData.userData.discordUserId}`, {
				headers: {
					Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
				},
			})
		).json();
	}

	return {
		...parentData,
		discordData,
	};
};
