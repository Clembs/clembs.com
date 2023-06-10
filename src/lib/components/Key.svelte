<script lang="ts">
	export let modifier = false;
</script>

<kbd class="key" class:modifier>
	<slot />
</kbd>

<style lang="scss">
	.key {
		user-select: none;
		background-color: rgb(220, 220, 220);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		display: inline-block;
		border: 1px solid var(--color-on-background);
		text-align: center;
		font-size: 0.85rem;
		min-width: 2rem;
		letter-spacing: 0.05rem;
		font-family: inherit;

		&.modifier {
			min-width: 3rem;
		}

		&:hover {
			background-color: rgb(180, 180, 180);
		}
	}
</style>
