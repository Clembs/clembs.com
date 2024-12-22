import { relations, sql } from 'drizzle-orm';
import {
	timestamp,
	boolean,
	jsonb,
	pgTable,
	text,
	primaryKey,
	integer,
	date,
	varchar,
} from 'drizzle-orm/pg-core';
import type { SubscriptionStatus } from './types';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').unique().notNull(),
	email: text('email').unique().notNull(),
	badges: text('badges', { enum: ['VERIFIED', 'BLOCKED', 'SUPPORTER', 'CLEMBS'] }).array(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const comments = pgTable('comments', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	projectId: text('project_id'),
	userId: text('user_id'),
	parentId: text('parent_id'),
	isPinned: boolean('pinned'),
	isBlocked: boolean('blocked'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
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

export const donations = pgTable('donations', {
	id: text('id')
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	username: text('username').notNull(),
	amount: integer('amount').notNull(),
	currency: varchar('currency', {
		length: 3,
	}).notNull(),
	createdAt: date('created_at').notNull().defaultNow(),
	isSubscription: boolean('is_subscription').notNull().default(false),
	platform: text('platform', {
		enum: ['KOFI', 'PAYPAL', 'BOOSTY', 'BUYMEACOFFEE', 'TWITCH', 'OTHER'],
	}).notNull(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
	email: text('email').primaryKey(),
	lists: jsonb('lists').$type<Record<string, SubscriptionStatus>>().notNull(),
	subscribeToken: text('subscribe_token'),
	unsubscribeToken: text('unsubscribe_token'),
});

export const minecraftPlayers = pgTable('minecraft_players', {
	username: text('username').primaryKey().notNull(),
	type: text('type', {
		enum: ['premium', 'cracked'],
	}).notNull(),
	uuid: text('uuid'),
	teamId: text('team_id'),
	password: text('password').notNull(),
});

export const minecraftTeams = pgTable('minecraft_teams', {
	id: text('id')
		.default(sql`gen_random_uuid()`)
		.primaryKey(),
	name: text('name').notNull().unique(),
	description: text('description'),
	leader: text('leader').notNull(),
	color: text('color').notNull().unique(),
	passcode: text('passcode'),
});

export const usersRelations = relations(users, ({ many }) => ({
	comments: many(comments),
	sessions: many(sessions),
	donations: many(donations),
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
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
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
	}),
);

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

export const minecraftPlayersRelations = relations(minecraftPlayers, ({ one }) => ({
	team: one(minecraftTeams, {
		fields: [minecraftPlayers.teamId],
		references: [minecraftTeams.id],
	}),
}));

export const minecraftTeamsRelations = relations(minecraftTeams, ({ one, many }) => ({
	leader: one(minecraftPlayers, {
		fields: [minecraftTeams.leader],
		references: [minecraftPlayers.username],
	}),
	members: many(minecraftPlayers),
}));
