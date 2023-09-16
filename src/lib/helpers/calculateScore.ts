import type { Comment } from '$lib/db/types';

export function calculateScore(comment: Comment) {
	return (
		comment?.score?.reduce((acc, cur) => (acc = acc + (cur.type === 'UPVOTE' ? 1 : -1)), 0) || 0
	);
}
