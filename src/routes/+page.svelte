<script lang="ts">
	import { brandingData } from '$lib/data/branding';
	import Wordmark from './Wordmark.svelte';
	import { onMount } from 'svelte';

	let currentFace: 'logo' | 'irl' = 'irl';
	let isAnimating = false;

	onMount(() => {
		const projects = document.querySelectorAll('.project');

		projects.forEach((project) => {
			const banner = project.querySelector('img');

			function loaded() {
				banner?.classList.add('loaded');
			}

			if (banner?.complete || false) {
				loaded();
			} else {
				banner?.addEventListener('load', loaded);
			}
		});
	});
</script>

<main>
	<div class="intro">
		<button
			class="avatar"
			disabled={isAnimating}
			on:click={() => {
				if (isAnimating) return;
				isAnimating = true;
				setTimeout(() => (isAnimating = false), 500);
				currentFace = currentFace === 'irl' ? 'logo' : 'irl';
			}}
		>
			<!-- irl -->

			<div
				class="img-wrapper"
				class:animating={isAnimating}
				aria-hidden={currentFace !== 'irl'}
				id="irl"
			>
				<img
					src="/assets/clément-herrenchimsee-2023.webp"
					alt="Portrait of Clément smiling"
					draggable="false"
				/>
			</div>
			<!-- logo -->

			<div
				class="img-wrapper"
				class:animating={isAnimating}
				aria-hidden={currentFace !== 'logo'}
				id="logo"
			>
				<img src="/assets/logo-purplue.webp" alt="Clembs logo" draggable="false" />
			</div>
		</button>
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
			<a
				aria-label="View brand project: {project.title}"
				href="/branding/{project.id}"
				class="project"
				style="background-image: url({project.bannerThumbnailPath})"
			>
				<img src={project.bannerPath} alt={project.brand} loading="lazy" />
				<span class="year" aria-label="Designed in {project.finishedAt.getFullYear()}">
					{project.finishedAt.getFullYear()}
				</span>
			</a>
		{/each}
	</div>
	<div class="projects rest">
		{#each brandingData.slice(2) as project}
			<a
				aria-label="View brand project: {project.title}"
				href="/branding/{project.id}"
				class="project"
				style="background-image: url({project.bannerThumbnailPath})"
			>
				<img src={project.bannerPath} alt={project.brand} loading="lazy" />
				<span class="year" aria-label="Designed in {project.finishedAt.getFullYear()}">
					{project.finishedAt.getFullYear()}
				</span>
			</a>
		{/each}
	</div>

	<span
		aria-hidden="true"
		style="
	opacity: 0.15;
	color: white;
	text-align: left;
	transform: rotateY(180deg);
	">Strange, isn't it?</span
	>
</main>

<style lang="scss">
	@keyframes switchPfpFront {
		0% {
			z-index: 2;
			transform: translate(0px, 0px) scale(1);
		}
		50% {
			z-index: 0;
			transform: translate(35px, 35px) scale(0.7);
		}
		100% {
			transform: translate(5px, 5px) scale(1);
		}
	}

	@keyframes switchPfpBack {
		0% {
			z-index: 0;
			transform: translate(5px, 5px) scale(1);
		}
		50% {
			z-index: 2;
			transform: translate(-35px, -35px) scale(0.7);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}

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

		.avatar {
			cursor: pointer;
			appearance: none;
			border: none;
			position: relative;
			background-color: transparent;
			border-radius: 1rem;
			padding: 0;
			margin: 0;
			width: 117px;
			height: 117px;
			border-radius: 999px;
			box-shadow: none;

			.img-wrapper {
				position: absolute;
				inset: 0;
				z-index: 2;
				transition: transform ease-in-out 100ms;

				&.animating {
					animation: switchPfpBack ease-in-out 500ms;
				}

				img {
					width: 117px;
					height: 117px;
					border-radius: 999px;
					border: 1px var(--color-on-background) solid;
					// box-shadow: 3px 3px 0px 0px var(--color-on-background);
				}

				&::after {
					border-radius: 999px;
					content: '';
					background-color: black;
					inset: 0;
					position: absolute;
					opacity: 0;
					transition: opacity 250ms ease-in-out;
				}

				&[aria-hidden='true'] {
					&.animating {
						animation: switchPfpFront ease-in-out 500ms;
					}

					z-index: 0;
					transform: translate(5px, 5px);

					&::after {
						opacity: 1;
					}
				}
			}
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
			transition: transform ease-out 0.1s, box-shadow ease-out 0.1s;
			border-radius: 1rem;
			border: 1px solid var(--color-on-background);
			aspect-ratio: 16/9;
			color: white;
			display: grid;
			place-items: center;
			background-size: cover;
			background-position: center;
			overflow: hidden;

			.year {
				position: absolute;
				right: 0.5rem;
				top: 0.5rem;
				color: var(--color-on-background);
				background: var(--color-background);
				border: 1px solid var(--color-on-background);
				border-radius: 0.5rem;
				font-size: 0.8rem;
				padding: 0.2rem 0.4rem;
				font-weight: 500;
			}

			img {
				opacity: 0;
				transition: opacity ease-in-out 300ms;
				object-position: center;
				object-fit: cover;
				width: 100%;
				height: 100%;

				&:global(.loaded) {
					opacity: 1;
				}
			}

			&:hover {
				transform: translateY(-4px);
				box-shadow: 0 4px 0 0 var(--color-on-background);
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
