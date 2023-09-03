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
		border: 1px solid var(--color-outline);
		box-shadow: 0 2px 0 0 var(--color-outline);
		text-align: center;
		font-size: 0.85rem;
		min-width: 2rem;
		letter-spacing: 0.05rem;
		font-family: inherit;
		translate: 0 0;
		margin: 0 0.25rem;

		&.modifier {
			min-width: 3rem;
		}

		&:hover {
			background-color: rgb(180, 180, 180);
		}

		&:active {
			translate: 0 1px;
			box-shadow: 0 1px 0 0 var(--color-outline);
		}
	}
</style>
