import type { Comment } from '$lib/db/types';

export function nestComments(comments: Comment[]): Comment[] {
	// Find comments which have a parentId attribute
	// If they do, attach them to their parent's childComments attribute and remove them from the array
	// If they don't, add them to the final array
	// Do that recursively (call groupComments) until there are no more comments with a parentId attribute
	const commentMap = new Map<string, Comment>();
	const nestedComments: Comment[] = [];

	comments.forEach((comment) => {
		commentMap.set(comment.id, { ...comment, childComments: [] });
	});

	commentMap.forEach((comment) => {
		if (comment.parentId === null) {
			nestedComments.push(comment);
		} else {
			const parentComment = commentMap.get(comment.parentId);
			if (parentComment) {
				if (!parentComment.childComments) {
					parentComment.childComments = [];
				}
				parentComment.childComments.push(comment);
			}
		}
	});

	return nestedComments;
}
