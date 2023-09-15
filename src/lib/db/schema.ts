import type { UserPreferences } from './UserPreferences';
import { relations } from 'drizzle-orm';
import { timestamp, boolean, jsonb, pgTable, text, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').unique().notNull(),
	email: text('email').unique(),
	badges: text('badges', { enum: ['VERIFIED', 'BLOCKED', 'SUPPORTER', 'CLEMBS'] }).array(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	preferences: jsonb('preferences').$type<UserPreferences>(),
});

export const comments = pgTable('comments', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	projectId: text('project_id'),
	userId: text('user_id'),
	parentId: text('parent_id'),
	// referenceCommentId: text('reference_comment_id'),
	isPinned: boolean('pinned'),
	isBlocked: boolean('blocked'),
});

export const usersRelations = relations(users, ({ many }) => ({
	comments: many(comments),
	mentionedInComments: many(mentions),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
	author: one(users, {
		fields: [comments.userId],
		references: [users.id],
	}),
	parentComment: one(comments, {
		fields: [comments.parentId],
		references: [comments.id],
		relationName: 'child_comments',
	}),
	childComments: many(comments, {
		relationName: 'child_comments',
	}),
	score: many(userCommentVote),
	mentionedUsers: many(mentions),
}));

export const userCommentVote = pgTable(
	'user_comment_vote',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		commentId: text('comment_id')
			.notNull()
			.references(() => comments.id),
		type: text('type', {
			enum: ['UPVOTE', 'DOWNVOTE'],
		}),
	},
	(t) => ({
		pk: primaryKey(t.userId, t.commentId),
	})
);

export const mentions = pgTable(
	'mentions',
	{
		commentId: text('comment_id')
			.notNull()
			.references(() => comments.id),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
	},
	(t) => ({
		pk: primaryKey(t.userId, t.commentId),
	})
);

export const mentionedUsersRelations = relations(mentions, ({ one }) => ({
	user: one(users, {
		fields: [mentions.userId],
		references: [users.id],
	}),
	comment: one(comments, {
		fields: [mentions.commentId],
		references: [comments.id],
	}),
}));

export const userCommentVoteRelations = relations(userCommentVote, ({ one }) => ({
	user: one(users, {
		fields: [userCommentVote.userId],
		references: [users.id],
	}),
	comment: one(comments, {
		fields: [userCommentVote.commentId],
		references: [comments.id],
	}),
}));
