<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';
	import { categories } from '$lib/data/blog/_categories';
	import { page } from '$app/stores';

	$: selectedCategory = $page.url.pathname.split('/').pop() || 'blog';
</script>

<main>
	<header>
		<h1>Clembs' Blog</h1>

		<div class="chips">
			<Chip checked={selectedCategory === 'blog'} href="/blog">All posts</Chip>
			{#each categories as category}
				{@const selected = selectedCategory === category.id}
				<Chip checked={selected} href="/blog/{category.id}">
					{category.name}
				</Chip>
			{/each}
		</div>
	</header>

	<slot />
</main>

<style lang="scss">
	main {
		padding: 1rem;

		header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			margin-bottom: 1rem;

			h1 {
				font-size: 3.5rem;
			}

			.chips {
				display: flex;
				gap: 0.5rem;
				flex-wrap: wrap;
			}
		}
	}
</style>
