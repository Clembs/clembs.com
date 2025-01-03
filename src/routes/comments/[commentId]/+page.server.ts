import { db } from '$lib/db/index.js';
import { userCommentVote, comments } from '$lib/db/schema';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { RequestEvent } from './$types';

async function vote(
	{ params, locals: { getUserData } }: RequestEvent,
	voteType: 'UPVOTE' | 'DOWNVOTE',
) {
	const userData = await getUserData();
	if (!userData) return fail(401);
	if (userData?.badges?.includes('BLOCKED')) return fail(403);

	const commentData = await db.query.comments.findFirst({
		where: ({ id }, { eq }) => eq(id, params.commentId),
	});
	if (!commentData) error(404);

	const originalVote = await db.query.userCommentVote.findFirst({
		where: ({ commentId, userId }, { eq, and }) =>
			and(eq(commentId, params.commentId), eq(userId, userData.id)),
	});

	if (originalVote) {
		if (originalVote.type === voteType) {
			await db
				.delete(userCommentVote)
				.where(
					and(
						eq(userCommentVote.commentId, params.commentId),
						eq(userCommentVote.userId, userData.id),
					),
				);
		} else {
			await db
				.update(userCommentVote)
				.set({
					commentId: params.commentId,
					userId: userData.id,
					type: voteType,
				})
				.where(
					and(
						eq(userCommentVote.commentId, params.commentId),
						eq(userCommentVote.userId, userData.id),
					),
				);
		}
	} else {
		await db.insert(userCommentVote).values({
			commentId: params.commentId,
			userId: userData.id,
			type: voteType,
		});
	}

	return { success: true };
}

export const actions = {
	upvote: async (event) => {
		return vote(event, 'UPVOTE');
	},
	downvote: async (event) => {
		return vote(event, 'DOWNVOTE');
	},
	delete: async ({ params, locals: { getUserData } }) => {
		const userData = await getUserData();

		if (!userData) {
			error(401);
		}

		const commentData = await db.query.comments.findFirst({
			where: ({ id }, { eq }) => eq(id, params.commentId),
		});

		if (!commentData) {
			error(404);
		}

		if (userData.id !== commentData.userId && !userData.badges?.includes('CLEMBS')) {
			error(401);
		}

		async function deleteCommentsAndChildren(commentId: string) {
			// delete comment votes
			await db.delete(userCommentVote).where(eq(userCommentVote.commentId, commentId));

			// find child comments
			const childComments = await db.query.comments.findMany({
				where: ({ parentId }, { eq }) => eq(parentId, commentId),
			});

			// delete comment itself
			await db.delete(comments).where(eq(comments.id, commentId));

			// recursively do that
			await Promise.all(childComments.map((comment) => deleteCommentsAndChildren(comment.id)));
		}

		await deleteCommentsAndChildren(params.commentId);

		return { success: true };
	},
	pin: async ({ params, locals: { getUserData } }) => {
		const userData = await getUserData();

		if (!userData) {
			error(401);
		}

		if (!userData.badges?.includes('CLEMBS')) {
			error(401);
		}

		const commentData = await db.query.comments.findFirst({
			where: ({ id }, { eq }) => eq(id, params.commentId),
		});

		if (!commentData) {
			error(404);
		}

		await db
			.update(comments)
			.set({
				isPinned: !commentData.isPinned,
			})
			.where(eq(comments.id, params.commentId));

		return { success: true };
	},
};
