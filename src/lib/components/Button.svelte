<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		style?: 'filled' | 'outlined' | 'text' | 'danger';
		disabled?: boolean;
		type?: 'submit' | 'button';
		icon?: boolean;
		inline?: boolean;
		size?: 'sm' | 'm' | 'xl';
		class?: string;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
		onsubmit?: (event: Event) => void;
		[key: string]: any;
	}

	let {
		href = '',
		style = 'filled',
		disabled = false,
		type = 'button',
		icon = false,
		inline = true,
		size = 'm',
		class: className = '',
		children,
		onclick,
		onsubmit,
		...rest
	}: Props = $props();
</script>

{#if href && !disabled}
	<a
		class="button {style} {className} size-{size}"
		{href}
		target={href.startsWith('http') ? '_blank' : undefined}
		rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
		role="button"
		{...rest}
		class:inline
		class:icon
	>
		{@render children?.()}
	</a>
{:else}
	<button
		{onclick}
		{onsubmit}
		{type}
		class="button {style} {className} size-{size}"
		{disabled}
		{...rest}
		class:inline
		class:icon
	>
		{@render children?.()}
	</button>
{/if}

<style lang="scss">
	.button {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 2.625rem;
		width: 100%;
		padding: 0.5rem 1rem;
		gap: 0.7rem;

		appearance: none;
		position: relative;
		user-select: none;
		cursor: pointer;

		font-size: 1rem;
		font-family: inherit;
		font-weight: 500;
		text-align: center;
		text-decoration: none;

		background-color: var(--_bg);
		color: var(--_text-color);
		border: var(--_border);
		border-radius: 99rem;

		transition:
			background-color 150ms ease-in,
			max-width 150ms ease-in-out;

		&.inline {
			display: inline-flex;
			width: max-content;
		}

		&.icon {
			padding: 0.5rem;
		}

		&.filled {
			--_bg: var(--color-outline);
			--_border: 1px solid var(--color-outline);
			--_text-color: var(--color-background);
			--_hover-bg: var(--color-on-surface);
		}
		&.outlined {
			--_bg: var(--color-background);
			--_border: 1px solid var(--color-outline);
			--_text-color: var(--color-on-background);
			--_hover-bg: var(--color-surface);
		}
		&.text {
			--_bg: transparent;
			--_border: none;
			--_text-color: inherit;
			--_hover-bg: var(--color-surface);
		}
		&.danger {
			--_bg: var(--color-error);
			--_border: 1px solid var(--color-on-background);
			--_text-color: var(--color-on-error);
			--_hover-bg: var(--color-error);
		}

		:global(svg) {
			height: 24px;
			width: auto;
		}

		&.size-sm {
			font-size: 0.75rem;
			padding: 0.315rem 0.615rem;
			height: 2rem;

			:global(svg) {
				height: 18px;
				width: auto;
			}
		}
		&.size-xl {
			font-size: 1.5rem;
			padding: 0.75rem 1.5rem;
			height: 3.5rem;
		}

		&:hover,
		&:focus {
			background-color: var(--_hover-bg);
			// transition: background-color 150ms ease-out;
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
			pointer-events: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}
	@media (max-width: 450px) {
		.button {
			height: 2.25rem;
			font-size: 0.9rem;
			padding: 0 0.75rem;
		}
	}
</style>
