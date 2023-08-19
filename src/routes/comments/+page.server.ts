import { db } from '$lib/db';
import { comments } from '$lib/db/schema.js';
import { snowflake } from '$lib/snowflake.js';
import { error } from '@sveltejs/kit';
import type { InferModel } from 'drizzle-orm';

export async function load() {
	const comments = await db.query.comments.findMany({
		with: {
			author: true,
			userLikes: true,
			childComments: {
				with: {
					author: true,
					userLikes: true,
				},
			},
		},
	});

	return { comments };
}

export type Comment = Awaited<ReturnType<typeof load>>['comments'][number];

export const actions = {
	post: async ({ request }) => {
		const formData = await request.formData();

		if (!formData) {
			throw error(400);
		}

		const content = formData.get('content')?.toString();

		if (!content) {
			throw error(400);
		}

		const input: InferModel<typeof comments, 'insert'> = {
			id: snowflake.generate().toString(),
			content: content,
			userId: 'clembs',
		};

		await db.insert(comments).values(input);

		return { success: true };
	},
};
