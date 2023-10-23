import type { UserPreferences } from './UserPreferences';
import { relations, sql } from 'drizzle-orm';
import {
	timestamp,
	boolean,
	jsonb,
	pgTable,
	text,
	primaryKey,
	integer,
	real,
} from 'drizzle-orm/pg-core';
import type { HabileChatData } from './HabileChatData';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	challenge: text('challenge'),
	challengeExpiresAt: timestamp('challenge_expires_at'),
	username: text('username').unique().notNull(),
	email: text('email').unique(),
	badges: text('badges', { enum: ['VERIFIED', 'BLOCKED', 'SUPPORTER', 'CLEMBS'] }).array(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	preferences: jsonb('preferences').$type<UserPreferences>(),
	habileChatData: jsonb('habile_chat_data').$type<HabileChatData>(),
	discordUserId: text('discord_user_id'),
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

export const passkeys = pgTable('passkeys', {
	credentialId: text('credential_id').primaryKey(),
	publicKey: text('public_key').notNull(),
	counter: integer('counter').notNull(),
	userId: text('user_id').notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const sessions = pgTable('sessions', {
	id: text('id')
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	userId: text('user_id').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
});

export const otps = pgTable('otps', {
	id: text('id')
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	otp: integer('otp').notNull(),
	email: text('email').unique().notNull(),
	expiresAt: timestamp('expires_at').notNull(),
});

export const habileChatData = pgTable('habile_chat_data', {
	tokens: real('tokens').notNull(),
	used: real('used').notNull(),
	messages: integer('messages').notNull(),
});

export const purchases = pgTable('purchases', {
	checkoutSessionId: text('checkout_session_id').unique().notNull(),
	userId: text('user_id').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
	comments: many(comments),
	mentionedInComments: many(mentions),
	sessions: many(sessions),
	passkeys: many(passkeys),
	purchases: many(purchases),
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

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const passkeysRelations = relations(passkeys, ({ one }) => ({
	user: one(users, {
		fields: [passkeys.userId],
		references: [users.id],
	}),
}));

export const purchasesRelations = relations(purchases, ({ one }) => ({
	user: one(users, {
		fields: [purchases.userId],
		references: [users.id],
	}),
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
