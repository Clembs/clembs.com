import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { parse } from 'valibot';
import { UserPreferencesSchema, defaultUserPreferences } from '../../lib/db/UserPreferences';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	return {
		navButton: {
			href: '/comments',
			label: 'Comments',
		},
	};
};

export const actions: Actions = {
	updateSettings: async ({ request, locals: { getUserData } }) => {
		const userData = await getUserData();

		if (!userData) error(401);

		const formData = await request.formData();

		if (!formData) return fail(400);

		const newPreferencesString = formData.get('preferences')?.toString();

		if (!newPreferencesString) return fail(400);

		const newPreferences = JSON.parse(newPreferencesString);

		const validatedPreferences = parse(UserPreferencesSchema, newPreferences);

		await db
			.update(users)
			.set({
				preferences: validatedPreferences,
			})
			.where(eq(users.id, userData.id));

		return { success: true };
	},
	updateEmailSettings: async ({ request, locals: { getUserData } }) => {
		const userData = await getUserData();
		const formData = await request.formData();

		if (!userData) error(401);
		if (!formData) return fail(400);

		// checkboxes
		const allReplies = formData.get('allReplies')?.toString();
		const clembsReplies = formData.get('clembsReplies')?.toString();
		const mentioned = formData.get('mentioned')?.toString();

		await db
			.update(users)
			.set({
				preferences: {
					...(userData.preferences || defaultUserPreferences),
					email: {
						...(userData.preferences || defaultUserPreferences).email,

						allReplies: allReplies === 'on',
						clembsReplies: clembsReplies === 'on',
						mentioned: mentioned === 'on',
					},
				},
			})
			.where(eq(users.id, userData.id));

		return { success: true };
	},
};
