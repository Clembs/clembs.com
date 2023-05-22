<script lang="ts">
	import { brandingData } from '$lib/data/branding';
	import Wordmark from './Wordmark.svelte';
</script>

<main>
	<div class="intro">
		<div class="avatar">
			<img src="/assets/clément-election-2022.png" alt="Clément" draggable="false" />
		</div>
		<div class="text">
			<h3>Nice to meet you, I'm</h3>
			<Wordmark />
			<p>
				or Clément IRL, a 16 y/o high school student from the south of France. I am passionate about
				computers and express my love through design, code and video.<br /><br />From Discord bots
				to web apps to brand design to livestreaming, anything goes on clembs.com. Welcome!
			</p>
		</div>
	</div>

	<div class="projects featured">
		{#each brandingData.slice(0, 2) as project}
			<a href="/branding/{project.id}" class="project">
				<span class="year">{project.finishedAt.getFullYear()}</span>
				<img
					src="https://c.clembs.com/branding/{project.id}{project.bannerPath}"
					alt={project.brand}
				/>
			</a>
		{/each}
	</div>
	<div class="projects rest">
		{#each brandingData.slice(2) as project}
			<a href="/branding/{project.id}" class="project">
				<span class="year">{project.finishedAt.getFullYear()}</span>
				<img
					src="https://c.clembs.com/branding/{project.id}{project.bannerPath}"
					alt={project.brand}
				/>
			</a>
		{/each}
	</div>

	<span
		style="
	opacity: 0.15;
	color: white;
	text-align: left;
	transform: rotateY(180deg);
	line-height: 0;
	">Strange, isn't it?</span
	>
</main>

<style lang="scss">
	main {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 0.5rem;
	}

	.intro {
		display: flex;
		gap: 1.5rem;
		padding: 1rem 0;
		margin: 0 auto;

		.avatar img {
			width: 100%;
			height: auto;
			border-radius: 999px;
			border: 1px black solid;
			box-shadow: 3px 3px 0px 0px black;
		}

		.text {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			max-width: 420px;

			h3,
			p {
				margin: 0;
			}
		}
	}

	.projects {
		display: grid;
		width: 100%;
		gap: 0.5rem;

		&.featured {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}
		&.rest {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		}

		.project {
			position: relative;
			transition: transform ease-out 0.1s;
			width: 100%;
			height: 100%;
			background-color: gray;
			border-radius: 0.5rem;
			aspect-ratio: 16/9;
			color: white;
			display: grid;
			place-items: center;

			// &:focus-within {
			// 	outline: 5px solid #987fff;
			// }

			.year {
				position: absolute;
				right: 0.5rem;
				top: 0.5rem;
				color: black;
				background: white;
				border: 1px solid black;
				border-radius: 0.4rem;
				font-size: 0.7rem;
				padding: 0.2rem 0.4rem;
				font-weight: 400;
			}

			img {
				border-radius: 0.5rem;
				border: 1px black solid;
				aspect-ratio: 16/9;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}

			&::after {
				content: '';
				position: absolute;
				background: black;
				transition: transform ease-out 0.1s;
				top: 0;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				border-radius: 0.5rem;
				z-index: -1;
			}

			&:hover,
			&:focus-within {
				transition: transform ease-out 0.1s;
				transform: translateY(-3px);
				&::after {
					transition: transform ease-out 0.1s;
					transform: translateY(3px);
				}
			}
		}
	}

	@media (max-width: 768px) {
		.intro {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;

			.text {
				align-items: center;
				gap: 1rem;
			}
		}
	}
</style>
