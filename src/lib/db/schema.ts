import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull(),
});

export const comments = pgTable('comments', {
	id: text('id').primaryKey(),
	content: varchar('content', {
		length: 512,
	}).notNull(),
	projectId: text('project_id'),
	userId: text('user_id'),
	parentId: text('parent_id'),
});

export const usersRelations = relations(users, ({ many }) => ({
	comments: many(comments),
	userLikes: many(userCommentLikes),
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
	userLikes: many(userCommentLikes),
}));

export const userCommentLikes = pgTable(
	'user_comment_likes',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		commentId: text('comment_id')
			.notNull()
			.references(() => comments.id),
	},
	(t) => ({
		pk: primaryKey(t.userId, t.commentId),
	})
);

export const userCommentLikesRelations = relations(userCommentLikes, ({ one }) => ({
	likedUser: one(users, {
		fields: [userCommentLikes.userId],
		references: [users.id],
	}),
	likedComment: one(comments, {
		fields: [userCommentLikes.commentId],
		references: [comments.id],
	}),
}));
