import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parse } from 'valibot';
import { UserPreferencesSchema } from '../../lib/db/UserPreferences';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	updateSettings: async ({ request, locals: { getUserData } }) => {
		const userData = await getUserData();

		if (!userData) throw error(401);

		const formData = await request.formData();

		if (!formData) return fail(400);

		const newPreferencesString = formData.get('preferences')?.toString();

		if (!newPreferencesString) return fail(400);

		const newPreferences = JSON.parse(newPreferencesString);

		const validatedPreferences = parse(UserPreferencesSchema, newPreferences);

		const newData = await db
			.update(users)
			.set({
				preferences: validatedPreferences,
			})
			.where(eq(users.id, userData.id));

		return { success: true };
	},
};
