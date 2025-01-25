<script lang="ts">
	import type { Article } from '$lib/data/blog-articles';
	import { IconChevronRight } from '@tabler/icons-svelte';

	interface Props {
		article: Article;
		orientation?: 'horizontal' | 'vertical';
	}

	let { article, orientation = 'horizontal' }: Props = $props();
</script>

<a href="/blog/{article.slug}" class="case-study-article {orientation}">
	<div class="image">
		<img
			loading="lazy"
			src={article.bannerPath}
			alt={article.subtitle}
			style="background-image: url({article.bannerThumbnailPath});"
			height={200}
			width={200}
		/>
	</div>

	<div class="about">
		<div class="name-and-summary">
			<time class="subtext" datetime={article.createdAt.toISOString()}>
				{article.createdAt.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
				})}
			</time>

			<h3 class="title">
				{article.title}
			</h3>

			<p class="subtext">
				{article.subtitle}
			</p>
		</div>

		<div class="cta subtext">
			Read case study <IconChevronRight size={18} />
		</div>
	</div>
</a>

<style lang="scss">
	.case-study-article {
		display: grid;
		column-gap: 1rem;
		row-gap: 0.5rem;
		text-decoration: none;
		background-color: var(--color-background);
		// padding: 0.25rem;
		// border-radius: 1rem;

		// temporary for consistency with the previous design
		padding: 1rem;
		border-radius: 1.25rem;
		border: 1px solid var(--color-outline);
		grid-row: span 2;

		@media (hover: hover) {
			&:hover {
				background-color: var(--color-surface);

				.cta :global(svg) {
					transform: translateX(0.25rem);
				}
			}
		}

		&.horizontal {
			grid-template-columns: 1fr 1.5fr;

			@media (max-width: 500px) {
				grid-template-columns: 1fr;
			}
		}

		&.vertical {
			grid-template-columns: 1fr;
			height: 100%;
		}

		.image {
			aspect-ratio: 16/9;

			img {
				object-position: center;
				object-fit: cover;
				background-size: cover;
				background-position: center;

				color: var(--color-background);
				border-radius: 0.75rem;
				border: 1px solid var(--color-outline);

				width: 100%;
				height: 100%;
			}
		}

		.about {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			justify-content: space-between;

			time {
				font-size: 0.65rem;
				color: var(--color-on-background);
				text-transform: uppercase;
				font-weight: 500;
			}

			.title {
				font-size: 1.1rem;
				font-weight: 500;
				text-wrap: balance;
				margin-bottom: 0.25rem;
			}
		}

		.cta {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			text-decoration: none;
			width: max-content;
			border-radius: 0.75rem;

			:global(svg) {
				transition: transform 100ms ease;
			}
		}
	}
</style>
