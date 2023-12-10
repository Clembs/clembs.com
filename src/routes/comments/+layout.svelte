<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
</script>

<main>
	<header>
		<h1>
			Comments
			<Badge style="outlined">Preview</Badge>
		</h1>
	</header>

	<slot />
</main>

<style lang="scss">
	header {
		display: flex;
		text-decoration: none;
		align-items: center;
		gap: 0.5rem;
		margin: 1rem;

		h1 {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}
	}
</style>
