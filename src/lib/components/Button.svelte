<script lang="ts">
	export let href = '';
	export let style: 'filled' | 'outlined' | 'text' = 'filled';
	export let disabled = false;
	export let type: 'submit' | 'button' = 'button';
</script>

{#if href && !disabled}
	<a class="button {style}" {href} role="button">
		<slot />
	</a>
{:else}
	<button on:click on:submit {type} class="button {style}" {disabled}>
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		height: max-content;
		width: max-content;
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
</style>
