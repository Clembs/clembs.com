import { db } from '$lib/db';
import { comments } from '$lib/db/schema.js';
import { generateSnowflake } from '$lib/helpers/snowflake.js';
import { fail } from '@sveltejs/kit';
import { isNull, type InferModel } from 'drizzle-orm';

export async function load({ locals }) {
	const session = await locals.getSession();
	const user = session?.user ?? null;

	const comments = await db.query.comments.findMany({
		with: {
			author: true,
			userLikes: true,
			childComments: true,
		},
		where: ({ parentId }) => isNull(parentId),
	});

	return { comments, user };
}

export type Comment = Awaited<ReturnType<typeof load>>['comments'][number];

export const actions = {
	post: async ({ request, locals }) => {
		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		const currentUser = await locals.getUserData();
		const content = formData.get('content')?.toString();
		const parentCommentId = formData.get('parent-comment')?.toString();

		if (parentCommentId) {
			const comment = await db.query.comments.findFirst({
				where: ({ id }, { eq }) => eq(id, parentCommentId),
			});

			if (!comment) {
				return fail(400, {
					message: 'Invalid parent comment ID',
				});
			}
		}

		if (!content) {
			return fail(400, {
				message: 'Missing content',
			});
		}

		const input: InferModel<typeof comments, 'insert'> = {
			id: generateSnowflake(),
			content: content,
			userId: currentUser?.id,
			parentId: parentCommentId,
		};

		await db.insert(comments).values(input);

		return { success: true };
	},
};
