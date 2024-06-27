import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { comments, otps, passkeys, users } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { EMAIL_REGEX, OTP_REGEX } from '$lib/helpers/regex';
import type { Comment } from '$lib/db/types';
import { checkUsername } from '$lib/helpers/checkUsername';
// import {
// 	any,
// 	email,
// 	equal,
// 	maxLength,
// 	minLength,
// 	object,
// 	optional,
// 	parse,
// 	regex,
// 	string,
// 	transform,
// 	union,
// 	url,
// } from 'valibot';
import { createSession, createUser, signOut } from '$lib/helpers/account';
import {
	verifyRegistrationResponse,
	type VerifiedRegistrationResponse,
	type VerifiedAuthenticationResponse,
	generateAuthenticationOptions,
	verifyAuthenticationResponse,
	generateRegistrationOptions,
} from '@simplewebauthn/server';
import type {
	AuthenticationResponseJSON,
	RegistrationResponseJSON,
} from '@simplewebauthn/server/script/deps';
import { emailHtmlTemplate, sendEmail } from '$lib/helpers/sendEmail';
import { randomInt } from 'crypto';
import { generateSnowflake } from '$lib/helpers/snowflake';
import { extractInfoFromUA } from '$lib/helpers/extractInfoFromUA';

export const load: PageServerLoad = async ({ locals }) => {
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
	Your account is almost created and verified!<br>
	Copy this one-time password into the account login page to finish setup.
	</p>
	
	<span style="border: 1px solid black; font-size: 16px; background-color: #F7F7F7; padding: 8px 16px; border-radius: 99px; margin: 16px 0px; text-decoration: none; font-family: monospace;">
		${otp}
	</span>
	
	<p style="padding-top: 32px; font-size: 12px; color: #6E6D7A;">
	Not you? You can safely ignore this email.
	</p>
	`
					),
				},
				email
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

		const username = formData.get('username')?.toString()?.trim();
		const usernameCheck = await checkUsername(username);

		if (username && usernameCheck?.message) {
			return fail(usernameCheck.status, {
				message: usernameCheck.message,
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
			const id = generateSnowflake();

			await createUser(event, {
				id,
				username,
				email,
			});

			return { success: true };
		} else {
			await createSession(event, existingUser.id);

			const passkeys = await db.query.passkeys.findMany({
				where: ({ userId }, { eq }) => eq(userId, existingUser.id),
			});

			if (!passkeys.length) {
				redirect(303, '/account/create-passkey');
			}

			return { success: true };
		}
	},
	checkUsername: async ({ request }) => {
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

		return { userExists: true };
	},
	passkeyLoginRequestChallenge: async ({ request, url }) => {
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

		const userData = await db.query.users.findFirst({
			where: ({ email: userEmail }, { eq }) => eq(userEmail, email),
			with: {
				passkeys: true,
			},
		});

		if (!userData) {
			return fail(401, {
				message: 'No user found with that email address.',
			});
		}

		const options = await generateAuthenticationOptions({
			rpID: url.hostname,
			userVerification: 'preferred',
			allowCredentials: userData?.passkeys.map((p) => ({
				id: Buffer.from(p.credentialId, 'base64'),
				type: 'public-key',
			})),
			timeout: 60000,
		});

		await db
			.update(users)
			.set({
				challenge: options.challenge,
				challengeExpiresAt: new Date(Date.now() + (options.timeout || 60000)),
			})
			.where(eq(users.id, userData.id));

		return { options };
	},
	passkeyRegisterRequestChallenge: async ({ request, url, locals: { getUserData } }) => {
		const userData = await getUserData();

		if (!userData || !userData.passkeys) {
			return fail(401, {
				message: 'You must be logged in to create a passkey.',
			});
		}

		const options = await generateRegistrationOptions({
			rpID: url.hostname,
			rpName: 'clembs.com',
			userID: userData.id,
			userName: userData.username,
			userDisplayName: userData.username,
			attestationType: 'none',
			excludeCredentials: userData.passkeys.map((p) => ({
				id: Buffer.from(p.credentialId, 'base64'),
				type: 'public-key',
			})),
			timeout: 60000,
			authenticatorSelection: {
				residentKey: 'required',
				userVerification: 'required',
			},
		});

		await db
			.update(users)
			.set({
				challenge: options.challenge,
				challengeExpiresAt: new Date(Date.now() + (options.timeout || 60000)),
			})
			.where(eq(users.id, userData.id));

		return { options };
	},
	verifyChallenge: async (event) => {
		const { request, url } = event;
		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		let response: {
			email: string;
			type: 'register' | 'login';
			response: RegistrationResponseJSON | AuthenticationResponseJSON;
			userAgent: string;
		};

		try {
			response = JSON.parse(formData.get('body')?.toString()!);
		} catch (e) {
			return fail(400, {
				message: String(e),
			});
		}

		if (!response) {
			return fail(400, {
				message: 'Invalid response.',
			});
		}

		const userData = await db.query.users.findFirst({
			where: ({ email }, { eq }) => eq(email, response.email),
			with: {
				passkeys: true,
			},
		});

		if (!userData) {
			return fail(401);
		}

		if (!userData.challenge) {
			return fail(400);
		}

		let verification: VerifiedRegistrationResponse | VerifiedAuthenticationResponse;

		if (response.type === 'register') {
			try {
				verification = await verifyRegistrationResponse({
					expectedChallenge: userData.challenge,
					expectedRPID: url.hostname,
					response: response.response as RegistrationResponseJSON,
					expectedOrigin: url.origin.replace('http://', 'https://'),
					requireUserVerification: true,
				});

				if (verification.verified && verification.registrationInfo) {
					const userAgentInfo = extractInfoFromUA(response.userAgent);

					await db.insert(passkeys).values({
						publicKey: Buffer.from(verification.registrationInfo.credentialPublicKey).toString(
							'base64'
						),
						credentialId: Buffer.from(verification.registrationInfo.credentialID).toString(
							'base64'
						),
						counter: verification.registrationInfo.counter,
						userId: userData.id,
						name: userAgentInfo ? `${userAgentInfo.os}` : 'Unknown device',
					});

					await createSession(event, userData.id);

					return { success: true };
				} else {
					error(401, { message: 'Invalid registration response.' });
				}
			} catch (e) {
				console.error(e);
				return fail(500, { message: String(e) });
			}
		}

		// if the user has a public key, verify their authentication
		try {
			const passkey = userData.passkeys.find(
				(p) => p.credentialId === Buffer.from(response.response.id, 'base64').toString('base64')
			);

			if (!passkey) {
				return fail(401, {
					message: 'Invalid passkey.',
				});
			}

			verification = await verifyAuthenticationResponse({
				expectedRPID: url.hostname,
				expectedChallenge: userData.challenge,
				expectedOrigin: url.origin.replace('http://', 'https://'),
				response: response.response as AuthenticationResponseJSON,
				requireUserVerification: true,
				authenticator: {
					credentialID: Buffer.from(passkey.credentialId, 'base64'),
					credentialPublicKey: Buffer.from(passkey.publicKey, 'base64'),
					counter: passkey.counter,
				},
			});

			if (
				verification.verified &&
				'authenticationInfo' in verification &&
				verification.authenticationInfo
			) {
				await db.update(users).set({ challenge: null }).where(eq(users.id, userData.id));

				await db
					.update(passkeys)
					.set({
						counter: verification.authenticationInfo.newCounter,
					})
					.where(eq(passkeys.credentialId, passkey.credentialId));

				await createSession(event, userData.id);

				return { success: true };
			}
		} catch (e) {
			console.error(e);
			return fail(500, { message: String(e) });
		}
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
	updatePasskey: async ({ request, locals: { getUserData } }) => {
		const userData = await getUserData();
		const formData = await request.formData();

		if (!userData) redirect(303, '/settings');
		if (!formData)
			return fail(400, {
				message: 'Invalid data.',
			});

		const id = formData.get('id')?.toString();
		const name = formData.get('name')?.toString();

		if (!id)
			return fail(400, {
				message: 'Invalid passkey ID.',
			});

		if (!name || name.length > 32 || name.length < 3)
			return fail(400, {
				message: 'Invalid passkey name.',
			});

		try {
			await db
				.update(passkeys)
				.set({
					name,
				})
				.where(and(eq(passkeys.credentialId, id), eq(passkeys.userId, userData.id)));

			return { success: true };
		} catch (e) {
			error(500, {
            				message: 'Failed to edit passkey.',
            			});
		}
	},
	deletePasskey: async ({ request, locals: { getUserData } }) => {
		const userData = await getUserData();
		const formData = await request.formData();

		if (!userData) redirect(303, '/settings');
		if (!formData)
			return fail(400, {
				message: 'Invalid data.',
			});

		const id = formData.get('id')?.toString();

		if (!id)
			return fail(400, {
				message: 'Invalid passkey ID.',
			});

		try {
			await db
				.delete(passkeys)
				.where(and(eq(passkeys.credentialId, id), eq(passkeys.userId, userData.id)));

			return { success: true };
		} catch (e) {
			error(500, {
            				message: 'Failed to delete passkey.',
            			});
		}
	},
};
