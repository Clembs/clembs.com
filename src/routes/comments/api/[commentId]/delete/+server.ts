import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { comments, mentions, userCommentVote } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const DELETE: RequestHandler = async ({ params, locals: { getUserData } }) => {
	if (!params.commentId) {
		throw error(400);
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

	return new Response(null, { status: 200 });
};
