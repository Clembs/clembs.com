<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import IconUserCircle from '@tabler/icons-svelte/dist/svelte/icons/IconUserCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav>
	<div class="nav-inside">
		<a href="/comments" class="title">Comments <Badge>Alpha</Badge></a>
		{#if data?.userData}
			<a href="/account" title="Account details" aria-label="Account details">
				<GradientAvatar user={data?.userData} size="2rem" showBadge={false} />
			</a>
		{:else}
			<Button href="/account" style="outlined">
				<IconUserCircle />
				<span class="label"> Login </span>
			</Button>
		{/if}
	</div>
</nav>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		padding: 1rem;
		max-width: 650px;
		margin: 0 auto;
	}

	nav {
		background-color: var(--color-background);
		border-radius: 1rem 1rem 0 0;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 9;
		border-bottom: 1px solid var(--color-outline);

		.nav-inside {
			padding: 0.5rem 0.5rem;
			display: flex;
			gap: 1rem;
			align-items: center;
			justify-content: space-between;
			max-width: 800px;
			margin: 0 auto;
		}

		.title {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			font-size: 1.5rem;
			font-weight: 500;
			border-radius: 1rem;
			padding: 0.5rem 1rem;
			text-decoration: none;

			&:hover {
				background-color: #eeeeee;
			}
		}
	}

	@media (max-width: 400px) {
		.label {
			display: none;
		}
	}
</style>
