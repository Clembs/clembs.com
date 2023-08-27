<script lang="ts">
	import BrandingItem from '$lib/components/Projects/BrandingItem.svelte';
	import SoftwareItem from '$lib/components/Projects/SoftwareItem.svelte';
	import { brandingData } from '$lib/data/branding';
	import { softwareData } from '$lib/data/software';
</script>

<main>
	<h1 id="design">Graphic design</h1>

	<p>
		My creative personality made me design as far back as I remember, first drawing logos with paper
		and evolving into using actual software. For the past 4 years, I have been sourcing inspiration
		from the real and digital world, to craft interfaces and brand identities that look good and
		that stick to people's minds.
	</p>

	<div class="design projects">
		{#each brandingData as project, index}
			<BrandingItem loaded data={project} {index} />
		{/each}
	</div>

	<h1 id="software">Apps & tools</h1>

	<p>
		Computers have always been a passion of mine, and so became coding after experimenting with
		Discord bots back in 2019. Having graduated from high school on July 2023, I will be moving to
		study for a Bachelor of Computer Technology (BUT Informatique) in order to become a professional
		developer.
	</p>

	<div class="software projects">
		{#each softwareData as project, index}
			<SoftwareItem loaded data={project} {index} />
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		padding: 1.5rem;
	}

	// h2 {
	// }

	.projects {
		display: grid;
		width: 100%;
		gap: 0.75rem;
		margin: 2rem 0;

		grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
	}
</style>
