<script lang="ts">
	import { letterColors } from './letterColors';
	import type { User } from '$lib/db/types';
	import { tweened } from 'svelte/motion';
	import { interpolate } from 'd3-interpolate';

	export let user: null | Partial<User> = null;
	export let showSilhouette = true;
	export let size = '2.25rem';

	$: username = user?.username ?? 'Guest';

	$: firstCharUsername = username[0].trim();
	$: lastCharUsername = username.at(-1)?.trim()!;

	const avatarGradient = tweened<{
		a: string;
		b: string;
	}>(
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
/>

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
	}
</style>
