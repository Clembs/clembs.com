<script lang="ts">
	import { LoaderIcon } from 'svelte-french-toast';

	export let href = '';
	export let loading = false;
</script>

{#if href}
	<a {href} {...$$restProps}>
		<slot />
	</a>
{:else}
	<button on:click {...$$restProps}>
		{#if loading}
			<LoaderIcon />
		{:else}
			<slot />
		{/if}
	</button>
{/if}

<style lang="scss">
	a,
	button {
		border: none;
		color: var(--color-on-surface);
		background-color: var(--color-background);
		border-radius: 9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		cursor: pointer;
		gap: 0.5rem;
		font-size: 0.8rem;
		max-width: max-content;
		font-weight: 500;
		border: 1px solid var(--color-outline);
		text-decoration: none;

		&:hover {
			background-color: var(--color-surface);
		}

		:global(svg) {
			width: 18px;
			height: 18px;
		}
	}
</style>
