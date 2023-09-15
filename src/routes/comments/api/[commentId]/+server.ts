import { db } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.commentId) {
		throw error(400);
	}

	const comment = await db.query.comments.findFirst({
		where: (comment, { eq }) => eq(comment.id, params.commentId!),
		with: {
			author: true,
			score: true,
			mentionedUsers: true,
			childComments: {
				with: {
					author: true,
					score: true,
					mentionedUsers: true,
				},
			},
		},
	});

	if (!comment) {
		throw error(500);
	}

	return json(comment);
};
