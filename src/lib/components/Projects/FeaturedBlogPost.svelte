<script lang="ts">
	import type { BlogPost } from '$lib/data/blog';
	import Card from '../Card.svelte';

	export let data: BlogPost;
</script>

<Card
	class="featured-blog-post"
	orientation="row"
	aria-label="Read blog article: {data.title}"
	href="/blog/{data.categoryId}/{data.id}"
>
	<div class="card-image">
		<img
			loading="lazy"
			src={data.bannerPath}
			alt={data.subtitle}
			style="background-image: url({data.bannerThumbnailPath});"
		/>
	</div>
	<div slot="card-content" class="card-content">
		<div class="top">
			<div class="title">
				{data.title}
			</div>
			<div class="subtext">
				{data.summary}
			</div>
		</div>
		<div class="bottom subtext">
			{data.subtitle} •
			{data.createdAt.toLocaleString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
			})}
		</div>
	</div>
</Card>

<style lang="scss">
	:global(.featured-blog-post) {
		grid-column: span 2;
	}

	.card-image {
		position: relative;
		transition:
			transform ease-out 0.1s,
			box-shadow ease-out 0.1s;
		border-right: 1px solid var(--color-outline);
		color: var(--color-background);
		display: grid;
		place-items: center;
		overflow: hidden;
		width: 50%;

		img {
			object-position: center;
			object-fit: cover;
			background-size: cover;
			background-position: center;

			width: 100%;
			height: 100%;
		}

		@media (max-width: 645px) {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid var(--color-outline);
		}
	}

	.card-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.5rem;
		height: 100%;

		.top {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.title {
			font-size: 1.1rem;
			font-weight: 500;
		}
	}
</style>
