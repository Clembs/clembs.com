<script lang="ts">
	import './shared.scss';
	import type { BrandingPost } from '$lib/data/branding';
	import type { Software } from '$lib/data/software';
	import BrandingItem from './BrandingItem.svelte';
	import SoftwareItem from './SoftwareItem.svelte';

	export let projects: BrandingPost[] | Software[];
	export let compact = false;
</script>

<div class="projects" class:compact>
	{#each projects as project, index}
		{#if 'title' in project}
			<BrandingItem data={project} {index} />
		{:else}
			<SoftwareItem data={project} {index} />
		{/if}
	{/each}
</div>

<style lang="scss">
	.projects {
		display: grid;
		width: 100%;
		gap: 0.75rem;
		grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));

		&.compact {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}
</style>
