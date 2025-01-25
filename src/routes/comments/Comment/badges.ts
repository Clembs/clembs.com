import Clembs from '$lib/icons/badges/clembs.svelte';
import Supporter from '$lib/icons/badges/supporter.svelte';
import type { SvelteComponent } from 'svelte';
import Verified from '$lib/icons/badges/verified.svelte';

export const badges: Record<
	string,
	{
		color: string;
		icon: SvelteComponent;
		label: string;
		description: string;
	}
> = {
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
