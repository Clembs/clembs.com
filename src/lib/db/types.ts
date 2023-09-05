import type { InferModel } from 'drizzle-orm';
import type { comments, userCommentVote, users } from './schema';

export type User = InferModel<typeof users>;

export type UserCommentVote = InferModel<typeof userCommentVote>;

export type UserBadge = Exclude<User['badges'], null>[number];

export type Comment = InferModel<typeof comments> & {
	author?: User | null | undefined;
	childComments?: Comment[] | null | undefined;
	parentComment?: Comment | null | undefined;
	score?: UserCommentVote[];
};
