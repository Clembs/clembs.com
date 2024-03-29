<script lang="ts">
	import type { BlogPost } from '$lib/data/blog';
	import Card from '../Card.svelte';

	export let data: BlogPost;
	export let loaded = false;
</script>

<Card
	class="card project"
	aria-label="View design project: {data.title}"
	href="/blog/{data.categoryId}/{data.id}"
>
	<div class="card-image" style="background-image: url({data.bannerThumbnailPath})">
		<img loading="lazy" src={data.bannerPath} class:loaded alt={data.subtitle} />
	</div>
	<div slot="card-content" class="card-content">
		<div class="text">
			<div class="title">
				{data.title}
			</div>
			<span class="subtext">
				{data.createdAt.toLocaleString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				})}
			</span>
		</div>
		<!-- <p>{project.brief}</p> -->
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
		background-size: cover;
		background-position: center;
		overflow: hidden;

		img {
			opacity: 0;
			transition: opacity ease-in-out 300ms;
			object-position: center;
			object-fit: cover;
			width: 100%;
			height: 100%;

			&:global(.loaded) {
				opacity: 1;
			}
		}
	}

	.text {
		.title {
			font-size: 1.1rem;
			font-weight: 500;
			margin-bottom: 0.25rem;
			text-wrap: balance;
		}
		.subtext {
			color: var(--color-on-surface);
			font-size: 0.9rem;
		}
	}
</style>
