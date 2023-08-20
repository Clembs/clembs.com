import { db } from '$lib/db';
import { users } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		const authTokenResponse = await supabase.auth.exchangeCodeForSession(code);

		if (!authTokenResponse || !authTokenResponse.data.user) {
			throw redirect(303, '/account');
		}

		const userEmail = authTokenResponse.data.user.email!;
		const userId = authTokenResponse.data.user.id!;

		const isNewUser = await db.query.users.findFirst({
			where: ({ email: dbEmail }, { eq }) => eq(dbEmail, userEmail),
		});

		if (isNewUser) {
			await db
				.insert(users)
				.values({ id: userId, email: userEmail, username: 'verified anonymous user' })
				.onConflictDoNothing();

			throw redirect(303, '/account');
		}
	}

	throw redirect(303, '/account');
};
