import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { comments } from '$lib/db/schema';
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

	// delete child comments
	await db.delete(comments).where(eq(comments.parentId, params.commentId));

	// delete comment itself
	await db.delete(comments).where(eq(comments.id, params.commentId));

	return new Response(null, { status: 200 });
};
