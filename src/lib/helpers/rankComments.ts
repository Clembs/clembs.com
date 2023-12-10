import type { Comment, User } from '$lib/db/types';
import { calculateScore } from './calculateScore';

export function rankComments(
	comments: Comment[],
	userData: User | null | undefined,
	sortingMode: string
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

	return allComments;
}
