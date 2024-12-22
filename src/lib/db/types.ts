import type { comments, sessions, userCommentVote, users } from './schema';
import type { categories } from '$lib/data/blog-articles/categories';

export type Session = typeof sessions.$inferSelect & {
	user?: User;
};

export type User = typeof users.$inferSelect & {
	comments?: Comment[];
	sessions?: Session[];
};

export type UserCommentVote = typeof userCommentVote.$inferSelect;

export type UserBadge = Exclude<User['badges'], null>[number];

export type Comment = typeof comments.$inferSelect & {
	author?: Partial<User> | null | undefined;
	childComments?: Comment[] | null | undefined;
	parentComment?: Comment | null | undefined;
	score?: Partial<UserCommentVote>[] | null | undefined;
};

export type Newsletter = (typeof categories)[number]['id'];

export type SubscriptionStatus = 'subscribed' | 'pending-sub' | null;
