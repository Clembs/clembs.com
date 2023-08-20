import { db } from '$lib/db';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	const comment = await db.query.comments.findFirst({
		with: {
			author: true,
			userLikes: true,
			parentComment: true,
			childComments: {
				with: {
					author: true,
					userLikes: true,
					childComments: true,
				},
			},
		},
		where: ({ id }, { eq }) => eq(id, params.commentId!),
		orderBy: ({ id }, { asc }) => asc(id),
	});

	if (!comment) {
		throw error(404);
	}

	return {
		comment: comment,
	};
};
