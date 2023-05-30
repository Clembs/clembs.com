<script lang="ts">
	export let href = '';
	export let style: 'filled' | 'outlined' | 'text' = 'filled';
	export let disabled = false;
	export let type: 'submit' | 'button' = 'button';
	// export let background = 'var(--color-primary)';
	// export let color = 'white';
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
		max-width: max-content;

		padding: 0.6rem 1.2rem;
		border-radius: 99rem;

		background-color: var(--_bg);
		border: var(--_border);
		color: var(--_text-color);

		transition: background-color 150ms ease-in, max-width 150ms ease-in-out;

		:global(svg) {
			height: 18px;
			width: auto;
		}

		&.filled {
			--_bg: black;
			--_border: 1px solid black;
			--_text-color: white;
			--_hover-bg: rgb(0 0 0 / 0.75);
		}
		&.outlined {
			--_bg: transparent;
			--_border: 1px solid black;
			--_text-color: inherit;
			--_hover-bg: rgb(0 0 0 / 0.2);
		}
		&.text {
			--_bg: transparent;
			--_border: none;
			--_text-color: inherit;
			--_hover-bg: rgb(0 0 0 / 0.2);
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
