import type { InferModel } from 'drizzle-orm';
import type { comments, userCommentVote, users } from './schema';
import type Mention from '../../routes/comments/Comment/Mention.svelte';

export type User = InferModel<typeof users> & {
	comments?: Comment[];
};

export type UserCommentVote = InferModel<typeof userCommentVote>;

export type UserBadge = Exclude<User['badges'], null>[number];

export type Comment = InferModel<typeof comments> & {
	author?: User | null | undefined;
	childComments?: Comment[] | null | undefined;
	parentComment?: Comment | null | undefined;
	score?: UserCommentVote[];
	mentionedUsers?: (Mention & {
		user: User;
	})[];
};
