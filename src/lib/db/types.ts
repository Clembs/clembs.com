import type { InferModel } from 'drizzle-orm';
import type { comments, passkeys, sessions, userCommentVote, users } from './schema';
import type Mention from '../../routes/comments/Comment/Mention.svelte';

export type Passkey = InferModel<typeof passkeys> & {
	user?: User;
};

export type Session = InferModel<typeof sessions> & {
	user?: User;
};

export type User = InferModel<typeof users> & {
	comments?: Comment[];
	passkeys?: Passkey[];
	sessions?: Session[];
};

export type UserCommentVote = InferModel<typeof userCommentVote>;

export type UserBadge = Exclude<User['badges'], null>[number];

export type Comment = InferModel<typeof comments> & {
	author?: User | null | undefined;
	childComments?: Partial<Comment>[] | null | undefined;
	parentComment?: Comment | null | undefined;
	score?: UserCommentVote[];
	mentionedUsers?: (Mention & {
		user: User;
	})[];
};
