<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import BlogPost from '$lib/components/Projects/BlogPost.svelte';

	export let data;
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

<ol class="article-{data.category.id === 'design' ? 'grid' : 'list'}">
	{#each data.posts as post}
		<li>
			<BlogPost data={post} />
		</li>
	{/each}
</ol>

<style lang="scss">
	.article-list,
	.article-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		gap: 1rem;
		margin-top: 1rem;
		height: 100%;

		li {
			margin: 0;
		}
	}

	.article-list {
		display: flex;
		flex-direction: column;
	}

	.article-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
</style>
