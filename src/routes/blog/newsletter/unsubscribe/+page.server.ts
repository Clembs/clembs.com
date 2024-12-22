import { categories } from '$lib/data/blog-articles/categories';
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
		error(400, 'Invalid request');
	}

	const queryEmail = decodeURIComponent(emailRaw);

	const category = categories.find((category) => category.id === list);

	if (!category) {
		error(400, 'Invalid list');
	}

	const newsletter = await db.query.newsletterSubscribers.findFirst({
		where: ({ email, unsubscribeToken }, { eq, and }) =>
			and(eq(email, queryEmail), eq(unsubscribeToken, token)),
	});

	if (!newsletter) {
		error(400, 'Invalid token or email address');
	}

	const unsubscribeToken = Math.random().toString(36).substring(2, 18);

	await db
		.update(newsletterSubscribers)
		.set({
			lists: {
				[list]: null,
			},
			unsubscribeToken,
		})
		.where(eq(newsletterSubscribers.email, emailRaw));

	return {
		success: true,
		category,
	};
}
