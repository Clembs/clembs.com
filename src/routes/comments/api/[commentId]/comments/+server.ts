import { getComments } from '$lib/helpers/getComments';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.commentId) {
		throw error(400);
	}

	const comments = await getComments({
		parentId: params.commentId,
	});

	if (!comments) {
		throw error(500);
	}

	return json(comments);
};
