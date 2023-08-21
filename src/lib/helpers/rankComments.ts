import type { Comment, User } from '$lib/db/types';

export function rankComments(
	comments: Comment[],
	userData: User | null | undefined,
	sortingMode: string,
	filters: {
		anonymous: boolean;
		blocked: boolean;
		liked: boolean;
	}
): Comment[] {
	let allComments: Comment[] = [];

	if (sortingMode === 'interactions') {
		allComments = comments.sort((a, b) => {
			const aRanking = (a.childComments?.length || 0) + (a.userLikes?.length || 0);
			const bRanking = (b.childComments?.length || 0) + (b.userLikes?.length || 0);

			return bRanking - aRanking;
		});
	} else if (sortingMode === 'recent') {
		allComments = comments.sort((a, b) => {
			const idA = BigInt(a.id);
			const idB = BigInt(b.id);
			return idA > idB ? -1 : idA < idB ? 1 : 0;
		});
	}

	return allComments.filter((comment) => {
		if (!filters.anonymous && !comment.userId) {
			return;
		}
		if (!filters.blocked && comment.author && comment.author.badges?.includes('BLOCKED')) {
			return;
		}
		if (
			filters.liked &&
			userData &&
			!comment.userLikes?.find(({ userId }) => userId === userData.id)
		) {
			return;
		}

		return comment;
	});
}
