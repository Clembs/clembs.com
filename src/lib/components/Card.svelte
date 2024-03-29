<script lang="ts">
	export let href = '';
	export let orientation: 'column' | 'row' = 'column';

	let className = '';

	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class="card {className}"
	style:--orientation={orientation}
	on:click
	on:mouseover
	on:focus
	{...$$restProps}
	role="button"
	tabindex="0"
>
	<slot />
	<div class="card-content">
		<slot name="card-content" />
	</div>
</svelte:element>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: var(--orientation, column);

		appearance: none;
		overflow: hidden;
		cursor: pointer;

		font-family: inherit;
		font-size: inherit;
		text-decoration: none;

		background-color: var(--color-background);
		border: 1px solid var(--color-on-background);
		border-radius: 1rem;

		transition: all cubic-bezier(0.64, 0.005, 0.43, 1.01) 200ms;

		.card-content {
			margin: 1rem;
			flex: 1;
		}

		&:hover {
			transform: translateY(-3px);
			box-shadow: 0 3px 0 0 var(--color-outline);
		}

		&:active {
			transform: translateY(0px);
			box-shadow: 0 0px 0 0 var(--color-outline);
			background-color: var(--color-surface);
		}
	}
</style>
