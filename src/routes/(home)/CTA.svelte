<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="cta">
	<div class="left">
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
			<circle cx="7" cy="7" r="7" fill="#18d68c" />
		</svg>

		Available for hire!
	</div>

	<Button href="/contact">Get in touch</Button>
</div>

<style lang="scss">
	.cta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem;
		padding-left: 1rem;
		background-color: var(--color-background);
		border-radius: 99rem;
		border: 1px solid var(--color-outline);
		font-size: 1.125rem;

		.left {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}
	}
</style>
