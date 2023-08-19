<script lang="ts">
	export let href = '';
	export let style: 'filled' | 'outlined' | 'text' = 'filled';
	export let disabled = false;
	export let type: 'submit' | 'button' = 'button';
	export let inline = true;
	let className = '';
	export { className as class };
</script>

{#if href && !disabled}
	<a class="button {style} {className}" {href} role="button" {...$$restProps} class:inline>
		<slot />
	</a>
{:else}
	<button
		on:click
		on:submit
		{type}
		class="button {style} {className}"
		{disabled}
		{...$$restProps}
		class:inline
	>
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		display: flex;
		align-items: center;
		justify-content: center;

		height: max-content;
		width: 100%;
		padding: 0.6rem 1.2rem;
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

		transition: background-color 150ms ease-in, max-width 150ms ease-in-out;

		&.inline {
			display: inline-flex;
			width: max-content;
		}

		&.filled {
			--_bg: var(--color-on-background);
			--_border: 1px solid var(--color-on-background);
			--_text-color: var(--color-background);
			--_hover-bg: var(--color-on-surface);
		}
		&.outlined {
			--_bg: transparent;
			--_border: 1px solid var(--color-on-background);
			--_text-color: inherit;
			--_hover-bg: var(--color-surface);
		}
		&.text {
			--_bg: transparent;
			--_border: none;
			--_text-color: inherit;
			--_hover-bg: var(--color-surface);
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
			font-size: 0.9rem;
			padding: 0.4rem 1rem;
		}
	}
</style>
