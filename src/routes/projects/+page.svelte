<script lang="ts">
	import DesignPostCard from '$lib/components/Projects/DesignPostCard.svelte';
	import SoftwareItem from '$lib/components/Projects/SoftwareItem.svelte';
	import { designPosts } from '$lib/data/design';
	import { softwareData } from '$lib/data/software';
</script>

<main>
	<h1>Projects</h1>

	<section id="design">
		<h2>Graphic design</h2>

		<p>
			My creative personality made me design as far back as I remember, first drawing logos with
			paper and evolving into using actual software. For the past 4 years, I have been sourcing
			inspiration from the real and digital world, to craft interfaces and brand identities that
			look good and that stick to people's minds.
		</p>

		<div class="design projects">
			{#each designPosts as project, index}
				<DesignPostCard loaded data={project} {index} />
			{/each}
		</div>
	</section>

	<section id="software">
		<h2>Apps & tools</h2>

		<p>
			Computers have always been a passion of mine, and so became coding after experimenting with
			Discord bots back in 2019. Having graduated from high school on July 2023, I will be moving to
			study for a Bachelor of Computer Technology (BUT Informatique) in order to become a
			professional developer.
		</p>

		<div class="software projects">
			{#each softwareData as project, index}
				<SoftwareItem loaded data={project} {index} />
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	main {
		margin: 1rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem 0;

		.projects {
			display: grid;
			width: 100%;
			gap: 0.75rem;
			margin: 1rem 0;

			grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
		}
	}
</style>
