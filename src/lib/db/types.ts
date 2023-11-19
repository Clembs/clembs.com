import type { comments, passkeys, sessions, userCommentVote, users } from './schema';

export type Passkey = typeof passkeys.$inferSelect & {
	user?: User;
};

export type Session = typeof sessions.$inferSelect & {
	user?: User;
};

export type User = typeof users.$inferSelect & {
	comments?: Comment[];
	passkeys?: Passkey[];
	sessions?: Session[];
};

export type UserCommentVote = typeof userCommentVote.$inferSelect;

export type UserBadge = Exclude<User['badges'], null>[number];

export type Comment = typeof comments.$inferSelect & {
	author?: Partial<User> | null | undefined;
	childComments?: Comment[] | null | undefined;
	parentComment?: Comment | null | undefined;
	score?: Partial<UserCommentVote>[];
	mentionedUsers?: {
		user: Partial<User>;
	}[];
};
