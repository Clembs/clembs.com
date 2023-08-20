import type { InferModel } from 'drizzle-orm';
import type { comments, userCommentLikes, users } from './schema';

export type User = InferModel<typeof users>;

export type UserBadge = Exclude<User['badges'], null>[number];

export type UserCommentLikes = InferModel<typeof userCommentLikes>;

export type Comment = InferModel<typeof comments> & {
	author?: User | null | undefined;
	userLikes?: UserCommentLikes[] | null | undefined;
	childComments?: Comment[] | null | undefined;
	parentComment?: Comment | null | undefined;
};
