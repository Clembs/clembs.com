<script lang="ts">
	import type { BlogPost } from '$lib/data/blog';
	import type { Archive } from '$lib/data/archive';
	import BlogPostCard from './BlogPost.svelte';
	import ArchiveItem from './ArchiveItem.svelte';

	export let projects: BlogPost[] | Archive[];
	export let compact = false;
	export let loaded = true;
</script>

<div class="projects" class:compact class:loaded>
	{#each projects as project}
		{#if 'title' in project}
			<BlogPostCard {loaded} data={project} />
		{:else}
			<ArchiveItem {loaded} data={project} />
		{/if}
	{/each}
</div>

<style lang="scss">
	.projects {
		display: grid;
		width: 100%;
		gap: 0.75rem;
		padding-top: 2rem;
		grid-template-columns: repeat(auto-fill, minmax(min(450px, 100%), 1fr));
		transition: all cubic-bezier(0.64, 0.005, 0.43, 1.01) 200ms;

		&.compact {
			grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
		}

		&:global(:not(.loaded) .project) {
			opacity: 0;
			transform: translateY(5rem);
			transition-delay: calc(200ms * var(--delay));
		}

		:global(.project.show) {
			opacity: 1;
			transform: translateY(0);
			transition-delay: 0s !important;
		}
	}
</style>
