<script lang="ts">
	import { projects, socials } from './_stuff';
	import '../styles/home.scss';
	import { brandIcons } from '$lib/icons/brands/_allIcons';
</script>

<main>
	<div class="content">
		<div class="header">
			<h1>Clembs website</h1>
			<i>now clembs.com</i>
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

<style>
	.socials {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 1rem;
	}
	:global(svg) {
		width: 2rem;
		height: auto;
		fill: white;
	}
</style>
