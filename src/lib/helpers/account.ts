import { db } from '$lib/db';
import { sessions } from '$lib/db/schema';
import type { Session } from '$lib/db/types';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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
		path: '/',
		sameSite: 'strict',
		priority: 'high',
		expires: expiresAt,
	});
}

export async function signOut({ locals, cookies }: RequestEvent) {
	const session = await locals.getSession();

	if (session) {
		await db.delete(sessions).where(eq(sessions.id, session.id));

		cookies.delete('session_id', { path: '/' });

		redirect(303, '/settings');
	}
}
