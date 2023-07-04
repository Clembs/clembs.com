<script lang="ts">
	import BrandingItem from '$lib/components/Projects/BrandingItem.svelte';
	import { brandingData } from '$lib/data/branding';

	const years = [...new Set(brandingData.map((p) => p.createdAt.getFullYear()))];
</script>

<main>
	<h1>Graphic design</h1>

	<p>
		I've been into design for 4 years now, sourcing inspiration by the digital worlds to craft
		interfaces and brand identities that look good and stick to people.
	</p>

	{#each years as year}
		<h2>{year} {year !== 2023 ? '- Archival in construction' : ''}</h2>
		<div class="projects">
			{#each brandingData.filter((p) => p.createdAt.getFullYear() === year) as project, index}
				<BrandingItem loaded data={project} {index} />
			{/each}
		</div>
	{/each}
</main>

<style lang="scss">
	main {
		padding: 1.5rem;
	}

	.projects {
		display: grid;
		width: 100%;
		gap: 0.75rem;
		margin: 2rem 0;
		grid-template-columns: repeat(auto-fill, minmax(min(450px, 100%), 1fr));
	}
</style>
