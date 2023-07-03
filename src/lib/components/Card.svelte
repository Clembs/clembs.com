<script lang="ts">
	export let href = '';
</script>

{#if href}
	<a {href} class="card" {...$$restProps}>
		<slot />
		<div class="card-content">
			<slot name="card-content" />
		</div>
	</a>
{:else}
	<div class="card" {...$$restProps}>
		<slot />
		<div class="card-content">
			<slot name="card-content" />
		</div>
	</div>
{/if}

<style lang="scss">
	.card {
		border: 1px solid var(--color-on-background);
		border-radius: 1rem;
		overflow: hidden;
		transition: all cubic-bezier(0.64, 0.005, 0.43, 1.01) 200ms;
		text-decoration: none;

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
