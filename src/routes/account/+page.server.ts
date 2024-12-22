import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { comments, otps, users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { EMAIL_REGEX, OTP_REGEX } from '$lib/helpers/regex';
import type { Comment } from '$lib/db/types';
import { checkUsername } from '$lib/helpers/checkUsername';
import { createSession, signOut } from '$lib/helpers/account';
import { emailHtmlTemplate, sendEmail } from '$lib/helpers/sendEmail';
import { randomInt } from 'crypto';

export const load: PageServerLoad = async () => {
	redirect(303, '/settings');
};

export const actions: Actions = {
	emailSendOTP: async ({ request, locals: { getSession, getUserData } }) => {
		const session = await getSession();

		if (session) {
			await getUserData();

			redirect(303, '/settings');
		}

		const formData = await request.formData();

		if (!formData) {
			return fail(400, {
				message: 'Invalid data.',
			});
		}

		const email = formData.get('email')?.toString();

		if (!email || !EMAIL_REGEX.test(email)) {
			return fail(400, {
				message: 'Invalid email address.',
			});
		}

		const existingUser = await db.query.users.findFirst({
			where: ({ email: dbEmail }, { eq }) => eq(dbEmail, email),
		});

		if (!existingUser) {
			return fail(404, {
				message: 'Creating a new account is no longer possible.',
			});
		}

		const otp = randomInt(100000, 999999);

		try {
			await db
				.insert(otps)
				.values({
					email,
					otp,
					expiresAt: new Date(Date.now() + 600000), // 10 minutes
				})
				.onConflictDoUpdate({
					where: eq(otps.email, email),
					set: {
						otp,
						expiresAt: new Date(Date.now() + 600000),
					},
					target: otps.email,
				});
		} catch (e) {
			console.error(e);
			error(500, {
				message: 'Failed to create one-time password. Try again later.',
			});
		}

		try {
			await sendEmail(
				{
					subject: `Your clembs.com one-time password is ${otp}`,
					html: emailHtmlTemplate(
						`<img
	style="height: 52px"
	alt="Habile smiling"
	src="https://c.clembs.com/files/67dafdd960982dba38.png"
	/>
	
	<h2>Welcome ${email}!</h2>
	
	<p>
		Copy this one-time password into the account login page to log in.
	</p>
	
	<span style="border: 1px solid black; font-size: 16px; background-color: #F7F7F7; padding: 8px 16px; border-radius: 99px; margin: 16px 0px; text-decoration: none; font-family: monospace;">
		${otp}
	</span>
	
	<p style="padding-top: 32px; font-size: 12px; color: #6E6D7A;">
	Not you? You can safely ignore this email.
	</p>
	`,
					),
				},
				email,
			);
		} catch (e) {
			console.error(e);
			error(500, {
				message: 'Failed to send email. Try again later.',
			});
		}

		const user = await db.query.users.findFirst({
			where: ({ email: dbEmail }, { eq }) => eq(dbEmail, email),
		});

		return { success: true, userExists: !!user };
	},
	verifyOTP: async (event) => {
		const {
			request,
			locals: { getSession, getUserData },
		} = event;
		const session = await getSession();

		if (session) {
			await getUserData();

			redirect(303, '/settings');
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
				message: 'Incorrect one-time password. Please try again.',
			});
		}

		const otpData = await db.query.otps.findFirst({
			where: ({ email: dbEmail }, { eq }) => eq(dbEmail, email),
		});

		if (!otpData || otpData.otp !== Number(otp) || otpData.email !== email) {
			return fail(400, {
				message: 'Incorrect one-time password. Please try again.',
			});
		}

		if (otpData.expiresAt.getTime() < Date.now()) {
			return fail(400, {
				message: 'One-time password expired. Please try again.',
			});
		}

		await db.delete(otps).where(eq(otps.id, otpData.id));

		const existingUser = await db.query.users.findFirst({
			where: ({ email: dbEmail }, { eq }) => eq(dbEmail, email),
		});

		if (!existingUser) {
			return fail(404, {
				message: 'Creating a new account is no longer possible.',
			});
		}

		await createSession(event, existingUser.id);

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

		const usernameCheck = await checkUsername(username);

		if (usernameCheck?.message) {
			return fail(usernameCheck.status, {
				message: usernameCheck.message,
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
	signOut,
	deleteAccount: async (event) => {
		const {
			locals: { getSession },
		} = event;
		const session = await getSession();

		if (session && session.user) {
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
			await signOut(event);
		}
	},
};
