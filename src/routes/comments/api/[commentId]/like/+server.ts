import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { db } from '$lib/db';
import { userCommentLikes } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const PUT: RequestHandler = async ({ params }) => {
	if (!params.commentId) {
		throw error(400);
	}

	const commentLikes = await db.query.userCommentLikes.findMany({
		where: ({ commentId }, { eq }) => eq(commentId, params.commentId),
	});

	let hasLiked = !!commentLikes.find(({ userId }) => userId === 'clembs');

	if (!hasLiked) {
		await db.insert(userCommentLikes).values({
			userId: 'clembs',
			commentId: params.commentId,
		});

		hasLiked = true;
	} else {
		await db.delete(userCommentLikes).where(eq(userCommentLikes.userId, 'clembs'));

		hasLiked = false;
	}

	return new Response((commentLikes.length + (hasLiked ? 1 : -1)).toString(), { status: 200 });
};
