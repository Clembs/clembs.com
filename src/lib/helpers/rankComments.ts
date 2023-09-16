import type { Comment, User } from '$lib/db/types';
import { calculateScore } from './calculateScore';

export interface CommentRankingFilters {
	anonymous: boolean;
	blocked: boolean;
	upvoted: boolean;
	mentionsMe: boolean;
	clembsReplied: boolean;
	pinned: boolean;
}

export function rankComments(
	comments: Comment[],
	userData: User | null | undefined,
	sortingMode: string,
	filters: CommentRankingFilters
): Comment[] {
	let allComments: Comment[] = [];

	if (sortingMode === 'interactions') {
		allComments = comments.sort((a, b) => {
			const aRanking = calculateScore(a);
			const bRanking = calculateScore(b);

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
			filters.upvoted &&
			userData &&
			!comment.score?.find(({ userId, type }) => userId === userData.id && type === 'UPVOTE')
		) {
			return;
		}
		if (
			filters.mentionsMe &&
			userData &&
			!comment.mentionedUsers?.find(({ userId }) => userId === userData.id)
		) {
			return;
		}
		if (
			filters.clembsReplied &&
			!comment.childComments?.find(({ author }) => author?.badges?.includes('CLEMBS'))
		) {
			return;
		}
		if (filters.pinned && !comment.isPinned) {
			return;
		}

		return comment;
	});
}
