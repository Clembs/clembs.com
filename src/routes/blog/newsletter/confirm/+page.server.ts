import { categories } from '$lib/data/blog/_categories';
import { db } from '$lib/db';
import type { Newsletter } from '$lib/db/Newsletters';
import { newsletterSubscribers } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ url }) {
	const emailRaw = url.searchParams.get('email');
	const token = url.searchParams.get('token');
	const list = url.searchParams.get('list') as Newsletter | null;

	if (!emailRaw || !token || !list) {
		throw error(400, 'Invalid request');
	}

	const queryEmail = decodeURIComponent(emailRaw);

	const category = categories.find((category) => category.id === list);

	if (!category) {
		throw error(400, 'Invalid list');
	}

	const newsletter = await db.query.newsletterSubscribers.findFirst({
		where: ({ email, subscribeToken }, { eq, and }) =>
			and(eq(email, queryEmail), eq(subscribeToken, token)),
	});

	if (!newsletter) {
		throw error(400, 'Invalid token or email address');
	}

	await db
		.update(newsletterSubscribers)
		.set({
			subscribeToken: null,
			lists: {
				[list]: 'subscribed',
			},
		})
		.where(eq(newsletterSubscribers.email, emailRaw));

	return {
		success: true,
		category,
	};
}
