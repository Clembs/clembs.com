import { db } from '$lib/db';
import { sessions, users } from '$lib/db/schema';
import type { Session, User } from '$lib/db/types';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { generateSnowflake } from './snowflake';

export async function renewSession(session: Session) {
	if (Date.now() - session.expiresAt.getTime() <= 10 * 60 * 60 * 1000) {
		session = {
			...session,
			...(await db
				.update(sessions)
				.set({
					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				})
				.where(eq(sessions.id, session.id))),
		};
	}

	return session;
}

export async function createUser(event: RequestEvent, user: Partial<User>) {
	const id = generateSnowflake();

	const [newUser] = await db
		.insert(users)
		.values({
			id,
			username: user.username || id,
			badges: ['VERIFIED'],
			email: user.email,
		})
		.onConflictDoNothing()
		.returning();

	await createSession(event, newUser.id);

	return newUser;
}

export async function createSession({ cookies }: RequestEvent, userId: string) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	const [newSession] = await db
		.insert(sessions)
		.values({
			expiresAt,
			userId,
		})
		.returning();

	cookies.set('session_id', newSession.id, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		priority: 'high',
		expires: expiresAt,
	});
}

export async function signOut({ locals, cookies }: RequestEvent) {
	const session = await locals.getSession();

	if (session) {
		await db.delete(sessions).where(eq(sessions.id, session.id));

		cookies.delete('session_id');

		throw redirect(303, '/settings');
	}
}
