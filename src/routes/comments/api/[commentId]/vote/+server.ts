import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { userCommentVote } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';

export const PATCH: RequestHandler = async ({ params, locals: { getUserData }, url }) => {
	if (!params.commentId) {
		throw error(404);
	}

	const userData = await getUserData();

	if (!userData) {
		throw error(401);
	}

	const commentData = await db.query.comments.findFirst({
		where: ({ id }, { eq }) => eq(id, params.commentId),
	});

	if (!commentData) {
		throw error(404);
	}

	const voteType = url.searchParams.get('type');

	if (voteType && voteType !== 'UPVOTE' && voteType !== 'DOWNVOTE') {
		throw error(400, 'Invalid comment vote type.');
	}

	const originalVote = await db.query.userCommentVote.findFirst({
		where: ({ commentId, userId }, { eq, and }) =>
			and(eq(commentId, params.commentId), eq(userId, userData.id)),
	});

	if (originalVote) {
		console.log('original vote', originalVote);

		if (originalVote.type === voteType) {
			const deleted = await db
				.delete(userCommentVote)
				.where(
					and(
						eq(userCommentVote.commentId, params.commentId),
						eq(userCommentVote.userId, userData.id)
					)
				)
				.returning();

			console.log('deleted', deleted);
		} else {
			const updated = await db
				.update(userCommentVote)
				.set({
					commentId: params.commentId,
					userId: userData.id,
					type: voteType as 'UPVOTE' | 'DOWNVOTE',
				})
				.where(
					and(
						eq(userCommentVote.commentId, params.commentId),
						eq(userCommentVote.userId, userData.id)
					)
				)
				.returning();

			console.log('updated', updated);
		}
	} else {
		const newVote = await db
			.insert(userCommentVote)
			.values({
				commentId: params.commentId,
				userId: userData.id,
				type: voteType as 'UPVOTE' | 'DOWNVOTE',
			})
			.returning();

		console.log('new vote', newVote);
	}

	return new Response(null, { status: 200 });
};
