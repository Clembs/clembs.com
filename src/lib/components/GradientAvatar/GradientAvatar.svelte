<script lang="ts">
	import { letterColors } from './letterColors';
	import type { User } from '$lib/db/types';
	import { badges } from '$lib/helpers/badges';
	import { rankBadges } from '$lib/helpers/rankBadges';
	import Tooltip from '../Tooltip.svelte';

	export let user: null | User = null;
	export let showBadge = true;
	export let size = '2.25rem';

	$: username = user?.username ?? 'anonymous';

	$: firstCharUsername = username[0].trim();
	$: lastCharUsername = username.at(-1)?.trim()!;

	$: avatarGradient = {
		a: letterColors[firstCharUsername] ?? letterColors.a,
		b: letterColors[lastCharUsername] ?? letterColors.z,
	};
</script>

<div
	class="avatar"
	style="--color-a: {avatarGradient.a}; --color-b: {avatarGradient.b}; --size: {size};"
>
	{#if user?.badges && showBadge}
		{@const badge = badges[rankBadges(user.badges)[0]]}
		<div class="avatar-badge" style="--background:{badge.background};">
			<Tooltip>
				<span slot="tooltip-content">{badge.label}</span>
				<div aria-label="User top-most badge">
					<svelte:component this={badge.icon} />
				</div>
			</Tooltip>
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
		// display: grid;
		// place-items: center;
		// color: white;
		// font-weight: 600;
		// text-shadow: 0 1px 0 0 var(--color-outline);
		// background-size: cover;

		&-badge {
			position: absolute;
			border: none;
			bottom: -0.55rem;
			right: -0.55rem;
			color: var(--background);
			width: 1.315rem;
			height: 1.315rem;

			:global(svg) {
				width: 1.315rem;
				height: 1.315rem;
			}
		}
	}
</style>
