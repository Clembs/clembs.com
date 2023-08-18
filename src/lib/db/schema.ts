import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull(),
});

export const comments = pgTable('comments', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	user_id: text('user_id').notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
	comments: many(comments),
}));

export const commentRelations = relations(comments, ({ one, many }) => ({
	user: one(users, {
		fields: [comments.user_id],
		references: [users.id],
	}),
	replies: many(comments),
}));
