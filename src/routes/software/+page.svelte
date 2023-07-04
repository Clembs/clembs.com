<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import SoftwareItem from '$lib/components/Projects/SoftwareItem.svelte';
	import { softwareData } from '$lib/data/software';

	const years = [...new Set(softwareData.map((p) => p.createdAt.getFullYear()))];
</script>

<MetaTags
	pageName="Apps & tools"
	description="Computers have been my thing forever, and I made coding my newfound passion. Having graduated on
	July 2023, I will be moving to Toulouse to study for a Bachelor of Computer Technology (BUT
	Informatique) in order to fullfill my dream of becoming a professional programmer!"
/>

<main>
	<h1>Apps & tools</h1>

	<p>
		Computers have been my thing forever, and I made coding my newfound passion. Having graduated on
		July 2023, I will be moving to Toulouse to study for a Bachelor of Computer Technology (BUT
		Informatique) in order to fullfill my dream of becoming a professional programmer!
	</p>

	{#each years as year}
		<h2>{year} {year !== 2023 ? '- Archival in construction' : ''}</h2>
		<div class="projects">
			{#each softwareData.filter((p) => p.createdAt.getFullYear() === year) as project, index}
				<SoftwareItem loaded data={project} {index} />
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
