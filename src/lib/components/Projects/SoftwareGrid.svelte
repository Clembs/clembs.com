<script lang="ts">
	import type { Software } from '$lib/data/software';
	import SoftwareItem from './SoftwareItem.svelte';

	export let projects: Software[];
	export let loaded = true;
</script>

<div class="projects" class:loaded>
	{#each projects as project, index}
		<SoftwareItem {loaded} data={project} {index} />
	{/each}
</div>

<style lang="scss">
	.projects {
		display: grid;
		gap: 0.75rem;
		padding-top: 2rem;
		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
		transition: all cubic-bezier(0.64, 0.005, 0.43, 1.01) 200ms;

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
