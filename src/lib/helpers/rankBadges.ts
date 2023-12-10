import type { User, UserBadge } from '$lib/db/types';

export function rankBadges(badges: Exclude<User['badges'], null>): UserBadge[] {
	const badgeImportance: UserBadge[] = ['BLOCKED', 'CLEMBS', 'SUPPORTER'];

	const sortedBadges = [...badges]
		.filter((badge) => badgeImportance.includes(badge))
		.sort((a, b) => badgeImportance.indexOf(a) - badgeImportance.indexOf(b));

	return sortedBadges;
}
