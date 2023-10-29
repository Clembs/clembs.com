import { HABILE_SECRET } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { otps, users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const { otp } = await request.json();
	const secret = request.headers.get('Authorization');
	const userId = request.headers.get('X-User-Id');

	if (!otp) throw error(400, 'Missing OTP');
	if (secret !== HABILE_SECRET) throw error(401, 'Invalid secret');
	if (!userId) throw error(401, 'Invalid user ID');

	const otpData = await db.query.otps.findFirst({
		where: ({ otp: dbOtp }, { eq }) => eq(dbOtp, otp),
	});

	if (!otpData) {
		throw error(404, 'Invalid OTP');
	}

	await db.delete(otps).where(eq(otps.id, otpData.id));

	if (otpData.expiresAt < new Date()) {
		throw error(404, 'OTP expired');
	}

	const userData = await db.query.users.findFirst({
		where: ({ discordUserId }, { eq }) => eq(discordUserId, userId),
	});

	if (!!userData) {
		throw error(
			409,
			"You've already linked your Discord profile. To use a different account, unlink your current one from the Dashboard."
		);
	}

	const [newUserData] = await db
		.update(users)
		.set({
			discordUserId: userId,
		})
		.where(eq(users.email, otpData.email))
		.returning();

	return json({
		username: newUserData.username,
		habileChatData: newUserData.habileChatData,
	});
};
