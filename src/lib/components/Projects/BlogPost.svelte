<script lang="ts">
	import type { BlogPost } from '$lib/data/blog';
	import Card from '../Card.svelte';

	export let data: BlogPost;
</script>

<Card
	class="blog-post"
	aria-label="Read blog article: {data.title}"
	href="/blog/{data.categoryId}/{data.id}"
>
	{#if data.bannerPath}
		<div class="card-image">
			<img
				loading="lazy"
				src={data.bannerPath}
				alt={data.subtitle}
				style="background-image: url({data.bannerThumbnailPath});"
			/>
		</div>
	{/if}
	<div slot="card-content" class="card-content">
		<div class="text">
			<div class="title">
				{data.title}
			</div>
			<span class="subtext">
				{data.subtitle} •
				{data.createdAt.toLocaleString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				})}
			</span>
		</div>
	</div>
</Card>

<style lang="scss">
	.card-image {
		position: relative;
		transition:
			transform ease-out 0.1s,
			box-shadow ease-out 0.1s;
		border-bottom: 1px solid var(--color-on-background);
		aspect-ratio: 16/9;
		color: var(--color-background);
		display: grid;
		place-items: center;
		overflow: hidden;

		img {
			object-position: center;
			object-fit: cover;
			background-size: cover;
			background-position: center;

			width: 100%;
			height: 100%;
		}
	}

	.text {
		.title {
			font-size: 1.1rem;
			font-weight: 500;
			margin-bottom: 0.25rem;
			text-wrap: balance;
		}
	}
</style>
