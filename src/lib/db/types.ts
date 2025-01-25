import type { sessions, userCommentVote, users } from './schema';
import type { categories } from '$lib/data/blog-articles/categories';

export type Session = typeof sessions.$inferSelect & {
	user?: User;
};

export type User = typeof users.$inferSelect & {
	sessions?: Session[];
};

export type LegacyComment = {
	id: string;
	content: string;
	parent_id: string | null;
	created_at: string;
	score: number;
	author: {
		username: string;
		badges: string[];
		joined_at: string | null;
		gradient: {
			from: string;
			to: string;
		};
	};
	child_comments: LegacyComment[];
};

export type UserCommentVote = typeof userCommentVote.$inferSelect;

export type UserBadge = Exclude<User['badges'], null>[number];

export type Newsletter = (typeof categories)[number]['id'];

export type SubscriptionStatus = 'subscribed' | 'pending-sub' | null;
