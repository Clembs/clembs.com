<script lang="ts">
	import { LoaderIcon } from 'svelte-french-toast';

	export let href = '';
	export let loading = false;
	export let big = false;
</script>

{#if href}
	<a {href} class:big {...$$restProps}>
		<slot />
	</a>
{:else}
	<button class:big on:click|stopPropagation {...$$restProps}>
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
		padding: 0.375rem;
		cursor: pointer;
		gap: 0.5rem;
		font-size: 0.8rem;
		max-width: max-content;
		font-weight: 500;
		border: 1px solid var(--color-outline);
		min-width: 30px;
		height: 30px;
		text-decoration: none;

		&:hover {
			background-color: var(--color-surface);
		}

		:global(svg) {
			width: 16px;
			height: 16px;
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
