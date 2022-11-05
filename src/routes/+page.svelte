<script lang="ts">
	import { projects, socials } from './_stuff';
	import { brandIcons } from '$lib/icons/brands/_allIcons';
</script>

<main>
	<div class="content">
		<div class="header">
			<h1>Clembs.com</h1>
		</div>
		<p>website still unfinished. check out my projects:</p>
		<ul>
			{#each projects as project}
				<li>
					<a href={project.link}>{project.name}</a>: {project.desc}
				</li>
			{/each}
		</ul>
		<p>contact me or watch me:</p>
		<div class="socials">
			{#each socials as social}
				<a class="social" href={social.link}>
					{@html brandIcons[social.clean]}
				</a>
			{/each}
		</div>
	</div>
</main>

<style lang="scss">
	main {
		color: white;
		background: black;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;

		.content {
			max-width: 50vh;
		}

		margin: 0 auto;
	}

	.socials {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}
	:global(svg) {
		width: 2rem;
		height: auto;
		fill: white;

		&:hover {
			fill: var(--links);
			scale: 1.2;
		}
	}

	.header {
		text-align: center;
	}
</style>
