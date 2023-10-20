import { db } from '$lib/db';
import { USERNAME_REGEX } from './regex';

/**
 * @description <span style="color: red">THIS IS SERVER SIDE CODE</span>
 *
 *  */
export async function checkUsername(username: string | undefined) {
	if (!username) {
		return {
			status: 400,
			message: 'Username is required.',
		};
	}

	if (username.length > 32) {
		return {
			status: 400,
			message: 'Username is too long.',
		};
	}

	if (username.length < 2) {
		return {
			status: 400,
			message: 'Username is too short.',
		};
	}

	if (username.includes(' ')) {
		return {
			status: 400,
			message: 'Username cannot have spaces.',
		};
	}

	if (!USERNAME_REGEX.test(username)) {
		return {
			status: 400,
			message: 'Username contains invalid characters.',
		};
	}

	const existingUserWithUsername = await db.query.users.findFirst({
		where: (u, { eq }) => eq(u.username, username),
		with: {
			passkeys: true,
		},
	});

	if (existingUserWithUsername) {
		return {
			user: existingUserWithUsername,
		};
	}

	return null;
}
