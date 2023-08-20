import { letterColors } from '$lib/components/GradientAvatar/letterColors';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX } from '$lib/helpers/email';

export const load: PageServerLoad = async ({ locals }) => {
	const username = (await locals.getUserData())?.username;
	if (!username) return;

	const firstCharUsername = username[0];
	const lastCharUsername = username.at(-1)!;

	const avatarGradient = {
		a: letterColors[firstCharUsername] ?? letterColors.a,
		b: letterColors[lastCharUsername] ?? letterColors.z,
	};

	return {
		themeGradient: {
			from: avatarGradient.a,
			to: avatarGradient.b,
		},
	};
};

export const actions: Actions = {
	login: async ({ request, url, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (session) {
			throw redirect(303, '/account');
		}

		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		const email = formData.get('email')?.toString();

		if (!email || !EMAIL_REGEX.test(email)) {
			return fail(400);
		}

		const baseUrl = url.origin.replace('[::1]', 'localhost');
		const fullUrl = `${baseUrl}/account/callback/`;

		console.log(fullUrl);

		const res = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				emailRedirectTo: fullUrl,
			},
		});

		console.log(res);

		return { success: true };
	},
	changeUsername: async ({ request, locals: { getUserData } }) => {
		const currentUser = await getUserData();

		if (!currentUser) {
			return fail(401);
		}

		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		const username = formData.get('username')?.toString();

		if (!username) {
			return fail(400);
		}

		if (username.length > 32) {
			return fail(400, {
				message: 'Username is too long.',
			});
		}

		if (username.length < 2) {
			return fail(400, {
				message: 'Username is too short.',
			});
		}

		if (!/^[a-zA-Z0-9._%+-]+$/.test(username)) {
			return fail(400, {
				message: 'Username contains invalid characters.',
			});
		}

		await db
			.update(users)
			.set({
				username: username,
			})
			.where(eq(users.id, currentUser.id));

		return { success: true };
	},
	signOut: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/account');
		}
	},
};
