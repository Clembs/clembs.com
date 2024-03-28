import type { UserBadge } from '$lib/db/types';
import Clembs from '$lib/icons/badges/clembs.svelte';
import Supporter from '$lib/icons/badges/supporter.svelte';
// import Verified from '$lib/icons/badges/verified.svelte';
import Blocked from '$lib/icons/badges/blocked.svelte';

export const badges: Record<
	UserBadge,
	{
		color: string;
		icon: any;
		label: string;
		description: string;
	}
> = {
	BLOCKED: {
		color: 'var(--color-error)',
		label: 'Soft-banned',
		icon: Blocked,
		description: 'This user was blocked for breaking the Comments rules.',
	},
	CLEMBS: {
		color: '#654FFF',
		label: 'Admin',
		icon: Clembs,
		description: 'This is Clembs, the one and only.',
	},
	// HABILE: {
	// 	label: 'Habile',
	// 	background: 'var(--color-primary)',
	// 	icon: IconRobot,
	// 	description: "The quirky cat robot who's helping with moderation.",
	// },
	SUPPORTER: {
		color: 'var(--color-success)',
		label: 'Supporter',
		icon: Supporter,
		description: 'This user supported me through Ko-fi or Boosty. Thanks!',
	},
	// VERIFIED: {
	// 	label: 'Email verified',
	// 	icon: Verified,
	// 	description: 'This user has signed in and verified their email.',
	// },
};
