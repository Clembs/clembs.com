<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import BlogArticle from '$lib/components/Projects/BlogArticle.svelte';
	import CaseStudyArticle from '$lib/components/Projects/CaseStudyArticle.svelte';
	import { categories } from '$lib/data/blog-articles/categories.js';
	import { IconChevronRight } from '@tabler/icons-svelte';

	let { data } = $props();
</script>

<MetaTags
	pageName="Blog - Clembs"
	description="My thoughts, projects, finds, and home to everything else I want to put into text."
/>

{#each categories as category}
	<section class="category">
		<header>
			<div class="text">
				<h2>{category.name}</h2>
				<p class="subtext">{category.description}</p>
			</div>

			<Button aria-label="View more posts" style="text" icon href="/blog/${category.id}">
				<IconChevronRight />
			</Button>
		</header>

		<div class="posts-wrapper">
			<ul class="posts">
				{#each data.posts.filter((post) => post.categoryId === category.id) as post}
					<li class="post">
						{#if post.categoryId === 'work'}
							<CaseStudyArticle article={post} />
						{:else}
							<BlogArticle article={post} />
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/each}

<style lang="scss">
	.category {
		margin: 2rem 0;

		header {
			display: flex;
			align-items: center;
			margin-bottom: 0.5rem;

			h2 {
				font-size: 1.5rem;
			}
		}

		.posts-wrapper {
			overflow-x: auto;
			overflow-y: scroll;
			margin: 0 -1rem;
		}

		.posts {
			display: flex;
			gap: 1rem;
			list-style: none;
			padding: 0.25rem 0;
			padding-bottom: 0.5rem;
			margin: 0 1rem;

			.post {
				min-width: 320px;
				height: 100%;
				margin: 0;
			}
		}
	}
</style>
