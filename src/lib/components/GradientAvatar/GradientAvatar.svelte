<script lang="ts">
	import { letterColors } from './letterColors';
	import type { User } from '$lib/db/types';
	import { badges } from '$lib/helpers/badges';
	import { rankBadges } from '$lib/helpers/rankBadges';
	import Tooltip from '../Tooltip.svelte';
	import { tweened } from 'svelte/motion';
	import { interpolate } from 'd3-interpolate';

	export let user: null | Partial<User> = null;
	export let showBadge = true;
	export let showSilhouette = true;
	export let size = '2.25rem';

	$: username = user?.username ?? 'Guest';

	$: firstCharUsername = username[0].trim();
	$: lastCharUsername = username.at(-1)?.trim()!;

	const avatarGradient = tweened(
		{
			a: firstCharUsername,
			b: lastCharUsername,
		},
		{
			duration: 200,
			interpolate,
		}
	);

	// update the gradient when the username changes
	$: updateUsername = avatarGradient.set({
		a: letterColors[username?.[0]?.trim()] ?? letterColors.a,
		b: letterColors[username?.at(-1)?.trim()!] ?? letterColors.b,
	});
</script>

<div
	class="avatar"
	class:showSilhouette
	style="--color-a: {$avatarGradient.a ||
		letterColors[firstCharUsername]}; --color-b: {$avatarGradient.b ||
		letterColors[lastCharUsername]}; --size: {size};"
	title={username}
>
	{#if user?.badges && showBadge}
		{@const badge = badges[rankBadges(user.badges)[0]]}
		<div class="avatar-badge" title={badge.label}>
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
		border: 1px solid var(--color-outline);

		&.showSilhouette::after {
			content: '';
			display: block;
			position: relative;
			height: 100%;
			width: 100%;
			background-image: url('/assets/silhouette-black.webp');
			background-size: cover;
			opacity: 0.75;
		}

		// display: grid;
		// place-items: center;
		// color: white;
		// font-weight: 600;
		// text-shadow: 0 1px 0 0 var(--color-outline);
		// background-size: cover;

		&-badge {
			position: absolute;
			border: none;
			bottom: -8px;
			right: -8px;
			width: 18px;
			height: 18px;
			z-index: 5;

			:global(svg) {
				width: 18px;
				height: 18px;
			}
		}
	}
</style>
