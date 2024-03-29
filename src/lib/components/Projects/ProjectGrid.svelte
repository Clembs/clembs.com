<script lang="ts">
	import type { BlogPost } from '$lib/data/blog';
	import type { Archive } from '$lib/data/archive';
	import BlogPostCard from './BlogArticleImage.svelte';
	import ArchiveItem from './ArchiveItem.svelte';

	export let projects: BlogPost[] | Archive[];
	export let compact = false;
</script>

<div class="projects" class:compact>
	{#each projects as project}
		{#if 'title' in project}
			<BlogPostCard data={project} />
		{:else}
			<ArchiveItem data={project} />
		{/if}
	{/each}
</div>

<style lang="scss">
	.projects {
		display: grid;
		width: 100%;
		gap: 0.75rem;
		padding-top: 2rem;
		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));

		&.compact {
			grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
		}
	}
</style>
