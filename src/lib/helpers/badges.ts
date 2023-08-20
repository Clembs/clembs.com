import IconCircleCheckFilled from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheckFilled.svelte';
import IconDiscountCheckFilled from '@tabler/icons-svelte/dist/svelte/icons/IconDiscountCheckFilled.svelte';
import IconAlertOctagonFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertOctagonFilled.svelte';
import IconHeartFilled from '@tabler/icons-svelte/dist/svelte/icons/IconHeartFilled.svelte';
import type { UserBadge } from '$lib/db/types';

export const badges: Record<
	UserBadge,
	{
		background: string;
		icon: any;
		label: string;
	}
> = {
	BLOCKED: {
		label: 'Blocked',
		background: 'var(--color-error)',
		icon: IconAlertOctagonFilled,
	},
	CLEMBS: {
		label: 'Clembs',
		background: 'var(--color-primary)',
		icon: IconDiscountCheckFilled,
	},
	SUPPORTER: {
		label: 'Supporter',
		background: 'var(--color-success)',
		icon: IconHeartFilled,
	},
	VERIFIED: {
		label: 'Email verified',
		background: 'var(--color-on-background)',
		icon: IconCircleCheckFilled,
	},
};
