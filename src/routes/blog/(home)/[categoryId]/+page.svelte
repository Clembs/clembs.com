<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import BlogArticle from '$lib/components/Projects/BlogArticle.svelte';
	import CaseStudyArticle from '$lib/components/Projects/CaseStudyArticle.svelte';

	let { data } = $props();
</script>

<MetaTags pageName="{data.category.name} - Blog - Clembs" description={data.category.description} />

<h2>
	{data.category.name}
</h2>

<p>
	{data.category.description}
</p>

<span class="subtext">
	{data.posts.length} posts
</span>

<ol class="article-list">
	{#each data.posts as post}
		<li>
			{#if post.categoryId === 'work'}
				<CaseStudyArticle article={post} />
			{:else}
				<BlogArticle article={post} />
			{/if}
		</li>
	{/each}
</ol>

<style lang="scss">
	.article-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		list-style: none;
		padding: 0;
		margin: 0;
		margin-top: 1rem;
		height: 100%;

		li {
			margin: 0;
		}
	}
</style>
