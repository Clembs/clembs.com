import type { UserBadge } from '$lib/db/types';
import Clembs from '$lib/icons/badges/clembs.svelte';
import Supporter from '$lib/icons/badges/supporter.svelte';
import Blocked from '$lib/icons/badges/blocked.svelte';
import type { ComponentType } from 'svelte';
import Verified from '$lib/icons/badges/verified.svelte';

export const badges: Record<
	UserBadge,
	{
		color: string;
		icon: ComponentType;
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
	SUPPORTER: {
		color: 'var(--color-success)',
		label: 'Supporter',
		icon: Supporter,
		description: 'This user supported me through Ko-fi or Boosty. Thanks!',
	},
	VERIFIED: {
		color: 'var(--color-on-surface)',
		label: 'Member',
		icon: Verified,
		description: 'This user has signed in and verified their email.',
	},
};
