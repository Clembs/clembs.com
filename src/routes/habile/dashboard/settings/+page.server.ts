import { db } from '$lib/db';
import { otps, users } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { randomInt } from 'crypto';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { defaultHabileChatData } from '$lib/db/HabileChatData';

export const actions: Actions = {
	createLinkOtp: async ({ locals: { getUserData } }) => {
		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		const otp = randomInt(100000, 999999);

		await db
			.insert(otps)
			.values({
				otp,
				email: userData.email!,
				expiresAt: new Date(Date.now() + 1000 * 60 * 5),
			})
			.onConflictDoUpdate({
				where: eq(otps.email, userData.email!),
				set: {
					otp,
					expiresAt: new Date(Date.now() + 1000 * 60 * 5),
				},
				target: [otps.otp, otps.expiresAt],
			});

		return { otp };
	},
	discordUnlink: async ({ locals: { getUserData } }) => {
		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		await db.update(users).set({ discordUserId: null }).where(eq(users.id, userData.id));

		return { success: true };
	},
	editSettings: async ({ request, locals: { getUserData } }) => {
		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		const formData = await request.formData();
		const dismissedUsageBanner = !(formData.get('dismissedUsageBanner')?.toString() === 'on');

		await db
			.update(users)
			.set({
				habileChatData: {
					...defaultHabileChatData,
					...userData.habileChatData,
					dismissedUsageBanner,
				},
			})
			.where(eq(users.id, userData.id));

		return { success: true };
	},
	resetKnowledge: async ({ locals: { getUserData } }) => {
		const userData = await getUserData();
		if (!userData) return fail(401, { message: 'Unauthorized. Please login and try again later.' });

		await db
			.update(users)
			.set({
				habileChatData: {
					...defaultHabileChatData,
					...userData.habileChatData,
					knowledge: '',
				},
			})
			.where(eq(users.id, userData.id));

		return { success: true };
	},
};
