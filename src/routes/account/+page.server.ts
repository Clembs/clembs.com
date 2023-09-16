import { letterColors } from '$lib/components/GradientAvatar/letterColors';
import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { comments, users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX, OTP_REGEX, USERNAME_REGEX } from '$lib/helpers/regex';
import type { Comment } from '$lib/db/types';

export const load: PageServerLoad = async ({ locals }) => {
	throw redirect(303, '/settings');
};

export const actions: Actions = {
	login: async ({ request, locals: { supabase, getSession, getUserData } }) => {
		const session = await getSession();

		if (session) {
			await getUserData();

			throw redirect(303, '/settings');
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

			throw redirect(303, '/settings');
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
					username: userId.replace('-', ''),
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

		if (username.includes(' ')) {
			return fail(400, {
				message: 'Username cannot have spaces.',
			});
		}

		if (!USERNAME_REGEX.test(username)) {
			return fail(400, {
				message: 'Username contains invalid characters.',
			});
		}

		const existingUserWithUsername = await db.query.users.findFirst({
			where: ({ username: uname }, { eq }) => eq(uname, username),
		});

		if (existingUserWithUsername) {
			return fail(400, {
				message: `Username already taken! Try adding an extra number or swap hyphens for underscores.`,
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
			throw redirect(303, '/settings');
		}
	},
	deleteAccount: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (session) {
			await supabase.auth.admin.deleteUser(session.user.id);

			// delete replies to user comments recursively
			function recursivelyDeleteComments(commentArray: Comment[]) {
				commentArray.forEach(async (c) => {
					const replies = await db.delete(comments).where(eq(comments.parentId, c.id));

					recursivelyDeleteComments(replies);
				});
			}

			// delete user comments
			const userComments = await db
				.delete(comments)
				.where(eq(comments.userId, session.user.id))
				.returning();

			recursivelyDeleteComments(userComments);

			// delete user
			await db.delete(users).where(eq(users.id, session.user.id));

			// sign out
			await supabase.auth.signOut();

			// delete user from supabase auth
			await supabase.auth.admin.deleteUser(session.user.id);

			throw redirect(303, '/settings');
		}
	},
};
