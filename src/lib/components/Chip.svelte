<script lang="ts">
	export let href = '';
	export let checked: boolean;
	export let disabled = false;

	let props = {
		class: 'chip',
		['aria-disabled']: disabled,
	};
</script>

{#if href}
	<a on:click {href} {...props} {...$$restProps} role="radio" aria-checked={checked}>
		<slot />
	</a>
{:else}
	<button on:click {...props} {...$$restProps} role="radio" aria-checked={checked}>
		<slot />
	</button>
{/if}

<style lang="scss">
	.chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		padding: 0.5rem 0.75rem;
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

		transition: background-color 150ms ease-in-out;

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
