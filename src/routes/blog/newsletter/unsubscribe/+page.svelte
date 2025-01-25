<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import HabileScared from '$lib/icons/habile/HabileScared.svelte';

	let { data } = $props();
</script>

<main>
	<HabileScared />

	<h1>You've been unsubscribed to the {data.category?.name} newsletter.</h1>

	<Button style="outlined" href="/blog/{data.category?.id}">Back to reading</Button>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 2rem 1rem;
		text-align: center;
		height: 50vh;
		text-wrap: balance;

		:global(svg) {
			width: 72px;
			height: 72px;
		}
	}
</style>
