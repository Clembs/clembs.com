<script lang="ts">
	import { LoaderIcon } from 'svelte-french-toast';

	export let loading = false;
	export let big = false;
</script>

<button class:big on:click|stopPropagation {...$$restProps}>
	{#if loading}
		<LoaderIcon />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
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
		min-width: 36px;
		height: 36px;

		&:hover {
			background-color: var(--color-surface);
		}

		:global(svg) {
			width: 18px;
			height: 18px;
		}

		&.big {
			font-size: 0.9rem;
			padding: 0.5rem 0.75rem;
			height: auto;

			:global(svg) {
				width: 24px;
				height: 24px;
			}
		}
	}
</style>
