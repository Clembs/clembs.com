<script lang="ts">
	import { letterColors } from './letterColors';
	import type { User, UserBadge } from '$lib/db/types';
	import { badges } from '$lib/helpers/badges';

	export let user: null | User = null;
	export let showBadge = true;
	export let size = '2.25rem';

	$: username = user?.username ?? 'anonymous user';

	$: firstCharUsername = username[0];
	$: lastCharUsername = username.at(-1)!;

	$: avatarGradient = {
		a: letterColors[firstCharUsername] ?? letterColors.a,
		b: letterColors[lastCharUsername] ?? letterColors.z,
	};

	function findMostImportantBadge(badges: Exclude<User['badges'], null>): UserBadge {
		const badgeImportance: UserBadge[] = ['BLOCKED', 'CLEMBS', 'SUPPORTER', 'VERIFIED'];

		const sortedBadges = [...badges].sort(
			(a, b) => badgeImportance.indexOf(a) - badgeImportance.indexOf(b)
		);

		return sortedBadges[0];
	}
</script>

<div
	class="avatar"
	style="--color-a: {avatarGradient.a}; --color-b: {avatarGradient.b}; --size: {size}"
>
	{#if user?.badges && showBadge}
		{@const badge = badges[findMostImportantBadge(user?.badges)]}
		<div title={badge.label} class="avatar-badge" style="--background:{badge.background};">
			<svelte:component this={badge.icon} />
		</div>
	{/if}
</div>

<style lang="scss">
	.avatar {
		position: relative;
		height: var(--size);
		width: var(--size);
		border-radius: 99rem;
		background: linear-gradient(45deg, var(--color-a), var(--color-b));

		&-badge {
			position: absolute;
			bottom: -0.75rem;
			right: -0.55rem;
			color: var(--background);

			:global(svg) {
				width: 1.315rem;
				height: 1.315rem;
			}
		}
	}
</style>
