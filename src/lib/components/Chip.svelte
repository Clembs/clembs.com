<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		checked: boolean;
		disabled?: boolean;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
		[key: string]: any;
	}

	let { href = '', checked, disabled = false, children, onclick, ...rest }: Props = $props();
</script>

{#if href}
	<a
		class="chip"
		aria-disabled={disabled}
		{onclick}
		{href}
		role="radio"
		aria-checked={checked}
		{...rest}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		class="chip"
		aria-disabled={disabled}
		{onclick}
		role="radio"
		aria-checked={checked}
		{...rest}
	>
		{@render children?.()}
	</button>
{/if}

<style lang="scss">
	.chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		padding: 0.315rem 0.75rem;
		gap: 0.5rem;

		user-select: none;
		cursor: pointer;
		white-space: nowrap;

		font-size: 0.95rem;
		font-family: inherit;
		font-weight: 500;
		text-align: center;
		text-decoration: none;

		background: var(--_bg);
		color: var(--_text-color);
		border: var(--_border);
		border-radius: 0.5rem;

		transition:
			background-color 150ms ease,
			color 150ms ease;

		:global(svg) {
			width: 20px;
			height: 20px;
		}

		&[aria-checked='true'] {
			--_bg: var(--color-on-background);
			--_text-color: var(--color-background);
			--_border: 1px solid var(--color-on-background);
			--_hover-bg: var(--color-on-surface);
		}
		&[aria-checked='false'] {
			--_bg: var(--color-surface);
			--_border: 1px solid transparent;
			--_text-color: var(--color-on-background);

			&:hover {
				--_bg: var(--color-surface);
			}
		}
	}
</style>
