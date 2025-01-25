<script lang="ts">
	import type { Article } from '$lib/data/blog-articles';

	interface Props {
		article: Article;
	}

	let { article }: Props = $props();
</script>

<a href="/blog/{article.categoryId}/{article.slug}" class="article">
	<h3 class="title">
		{article.title}
	</h3>

	<time class="subtext" datetime={article.createdAt.toISOString()}>
		{article.createdAt.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
		})}
	</time>

	<p class="subtext">
		{article.summary}
	</p>
</a>

<style lang="scss">
	.article {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		gap: 0.5rem;

		border: 1px solid var(--color-outline);
		background-color: var(--color-background);
		color: var(--color-on-background);
		padding: 1rem;
		border-radius: 0.5rem;
		transition: transform 100ms ease;

		&:hover {
			background-color: var(--color-surface);
			transform: rotate(1deg);
		}

		time {
			font-size: 0.65rem;
			color: var(--color-on-background);
			text-transform: uppercase;
			font-weight: 500;
		}
	}
</style>
