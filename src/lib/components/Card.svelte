<script lang="ts">
	export let href = '';

	let className = '';

	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	{href}
	class="card {className}"
	on:click
	on:mouseover
	on:focus
	{...$$restProps}
>
	<slot />
	<div class="card-content">
		<slot name="card-content" />
	</div>
</svelte:element>

<style lang="scss">
	.card {
		display: block;

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
		}

		&:hover {
			transform: translateY(-4px) !important;
			box-shadow: 0 4px 0 0 var(--color-on-background);
		}
		&:active {
			background-color: var(--color-surface);
			transform: translateY(0px);
			box-shadow: 0 0 0 0 var(--color-on-background);
		}
	}
</style>
