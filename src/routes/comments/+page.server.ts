import { db } from '$lib/db';
import { comments } from '$lib/db/schema';
import { generateSnowflake } from '$lib/helpers/snowflake';
import { fail } from '@sveltejs/kit';
import { isNull, type InferModel } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { rateLimit } from '$lib/helpers/handleRateLimit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const user = session?.user ?? null;

	const comments = await db.query.comments.findMany({
		with: {
			author: true,
			childComments: true,
		},
		where: ({ parentId }) => isNull(parentId),
	});

	return { comments, user };
};

export const actions: Actions = {
	post: async ({ request, locals, getClientAddress }) => {
		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		const currentUser = await locals.getUserData();
		const ipAddress = getClientAddress();

		if (currentUser?.badges?.includes('BLOCKED')) {
			return fail(400, {
				message: 'Your account is restricted.',
			});
		}

		const content = formData.get('content')?.toString()?.trim();

		if (!content) {
			return fail(400, {
				message: 'Missing content',
			});
		}

		const rateLimited = rateLimit(currentUser?.id || ipAddress, 60 * 1000, currentUser ? 5 : 1);

		if (rateLimited) {
			return fail(429, {
				message: 'Rate limited. Try again later.',
			});
		}

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
