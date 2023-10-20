import IconCircleCheckFilled from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheckFilled.svelte';
import IconDiscountCheckFilled from '@tabler/icons-svelte/dist/svelte/icons/IconDiscountCheckFilled.svelte';
import IconAlertOctagonFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertOctagonFilled.svelte';
import IconHeartFilled from '@tabler/icons-svelte/dist/svelte/icons/IconHeartFilled.svelte';
import IconRobot from '@tabler/icons-svelte/dist/svelte/icons/IconRobot.svelte';
import type { UserBadge } from '$lib/db/types';

export const badges: Record<
	UserBadge,
	{
		background: string;
		icon: any;
		label: string;
		description: string;
	}
> = {
	BLOCKED: {
		label: 'Blocked',
		background: 'var(--color-error)',
		icon: IconAlertOctagonFilled,
		description: 'This user was manually blocked for breaking the Comments rules.',
	},
	CLEMBS: {
		label: 'Clembs',
		background: 'var(--color-primary)',
		icon: IconDiscountCheckFilled,
		description: 'This is Clembs, the one and only.',
	},
	// HABILE: {
	// 	label: 'Habile',
	// 	background: 'var(--color-primary)',
	// 	icon: IconRobot,
	// 	description: "The quirky cat robot who's helping with moderation.",
	// },
	SUPPORTER: {
		label: 'Supporter',
		background: 'var(--color-success)',
		icon: IconHeartFilled,
		description: 'This user gave their financial support through Ko-fi or Boosty. Thanks!',
	},
	VERIFIED: {
		label: 'Email verified',
		background: 'var(--color-on-background)',
		icon: IconCircleCheckFilled,
		description: 'This user has signed in and verified their email.',
	},
};
