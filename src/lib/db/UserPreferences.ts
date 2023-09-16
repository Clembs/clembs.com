import { object, boolean, enumType, type Output } from 'valibot';

export const UserPreferencesSchema = object({
	soundEnabled: boolean(),
	theme: enumType(['light', 'dark']),
	email: object({
		allReplies: boolean(),
		clembsReplies: boolean(),
		popularComment: boolean(),
		mentioned: boolean(),
	}),
});

export type UserPreferences = Output<typeof UserPreferencesSchema>;

export const defaultUserPreferences: UserPreferences = {
	soundEnabled: true,
	theme: 'light',
	email: {
		allReplies: true,
		clembsReplies: false,
		popularComment: false,
		mentioned: true,
	},
};
