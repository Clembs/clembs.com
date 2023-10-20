import { db } from '$lib/db/index.js';
import { userCommentVote, mentions, comments } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	delete: async ({ params, locals: { getUserData } }) => {
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

		if (userData.id !== commentData.userId && !userData.badges?.includes('CLEMBS')) {
			throw error(401);
		}

		async function deleteCommentsAndChildren(commentId: string) {
			// delete comment votes
			await db.delete(userCommentVote).where(eq(userCommentVote.commentId, commentId));

			// delete comment mentions
			await db.delete(mentions).where(eq(mentions.commentId, commentId));

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
			throw error(401);
		}

		if (!userData.badges?.includes('CLEMBS')) {
			throw error(401);
		}

		const commentData = await db.query.comments.findFirst({
			where: ({ id }, { eq }) => eq(id, params.commentId),
		});

		if (!commentData) {
			throw error(404);
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
