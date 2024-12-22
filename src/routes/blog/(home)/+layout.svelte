<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';
	import { categories } from '$lib/data/blog-articles/categories';
	import { page } from '$app/stores';
</script>

<main>
	<header>
		<h1>Blog</h1>

		<p>Everything I write about, from design to code and everything in between.</p>

		<div class="chips">
			<Chip checked={$page.url.pathname === '/blog'} href="/blog">All posts</Chip>

			{#each categories as category}
				<Chip checked={$page.url.pathname.includes(category.id)} href="/blog/{category.id}">
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

			.chips {
				display: flex;
				gap: 0.5rem;
				flex-wrap: wrap;
			}
		}
	}
</style>
