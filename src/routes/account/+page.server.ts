import { letterColors } from '$lib/components/GradientAvatar/letterColors';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX, OTP_REGEX } from '$lib/helpers/regex';

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
	login: async ({ request, locals: { supabase, getSession, getUserData } }) => {
		const session = await getSession();

		if (session) {
			await getUserData();

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

		const res = await supabase.auth.signInWithOtp({
			email: email,
		});

		if (res.error) {
			console.error(res.error);

			throw error(res.error.status || 500, {
				message: res.error.message,
			});
		}

		return { success: true };
	},
	verifyOTP: async ({ url, request, locals: { getSession, getUserData, supabase } }) => {
		const session = await getSession();

		if (session) {
			await getUserData();

			throw redirect(303, '/account');
		}

		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		const email = formData.get('email')?.toString();

		if (!email || !EMAIL_REGEX.test(email)) {
			return fail(400, {
				message: 'Invalid email address.',
			});
		}

		const otp = formData.get('otp')?.toString();

		if (!otp || !OTP_REGEX.test(otp)) {
			return fail(400, {
				message: 'Incorrect one-time password.',
			});
		}

		const res = await supabase.auth.verifyOtp({
			email,
			token: otp,
			type: 'email',
		});

		if (res.error || !res.data) {
			console.error(res.error);

			throw error(res.error?.status || 500, {
				message: res.error?.message || 'Unexpected error.',
			});
		}

		const userEmail = res.data.user?.email!;
		const userId = res.data.user?.id!;

		const isNewUser = !(await db.query.users.findFirst({
			where: ({ email: dbEmail }, { eq }) => eq(dbEmail, userEmail),
		}));

		if (isNewUser) {
			await db
				.insert(users)
				.values({
					id: userId,
					email: userEmail,
					username: 'verified anonymous user',
					badges: ['VERIFIED'],
				})
				.onConflictDoNothing();
		}

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

		const username = formData.get('username')?.toString()?.trim();

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

		if (!/^[a-zA-Z0-9 ._%+-]+$/.test(username)) {
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
