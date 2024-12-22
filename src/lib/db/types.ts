import type { comments, sessions, streams, userCommentVote, users } from './schema';

export type Session = typeof sessions.$inferSelect & {
	user?: User;
};

export type User = typeof users.$inferSelect & {
	email: string;
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
	mentionedUsers?:
		| {
				user: Partial<User>;
		  }[]
		| null
		| undefined;
};

export type Stream = typeof streams.$inferSelect;
