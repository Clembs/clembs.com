import { db } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.commentId) {
		throw error(400);
	}

	const comments = await db.query.comments.findMany({
		where: (comment, { eq }) => eq(comment.parentId, params.commentId!),
		with: {
			author: true,
			childComments: true,
		},
	});

	if (!comments) {
		throw error(500);
	}

	return json(comments);
};
