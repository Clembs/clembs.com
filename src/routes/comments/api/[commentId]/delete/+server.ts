import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { comments, userCommentLikes } from '$lib/db/schema';
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

	await db.delete(userCommentLikes).where(eq(userCommentLikes.commentId, params.commentId));

	await db.delete(comments).where(eq(comments.id, params.commentId));

	return new Response(null, { status: 200 });
};
