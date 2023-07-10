<script lang="ts">
	export let href = '';
</script>

{#if href}
	<a {href} class="card" on:click on:mouseover on:focus {...$$restProps}>
		<slot />
		<div class="card-content">
			<slot name="card-content" />
		</div>
	</a>
{:else}
	<button on:click on:mouseover on:focus class="card" {...$$restProps}>
		<slot />
		<div class="card-content">
			<slot name="card-content" />
		</div>
	</button>
{/if}

<style lang="scss">
	.card {
		border: 1px solid var(--color-on-background);
		border-radius: 1rem;
		overflow: hidden;
		transition: all cubic-bezier(0.64, 0.005, 0.43, 1.01) 200ms;
		text-decoration: none;
		background-color: var(--color-background);
		display: block;
		appearance: none;

		.card-content {
			margin: 1rem;
		}

		&:is(a) {
			&:hover {
				transform: translateY(-4px);
				box-shadow: 0 4px 0 0 var(--color-on-background);
			}
			&:active {
				background-color: var(--color-surface);
				transform: translateY(0px);
				box-shadow: 0 0 0 0 var(--color-on-background);
			}
		}
	}
</style>
