<script lang="ts">
	import ProjectGrid from '$lib/components/Projects/ProjectGrid.svelte';
	import { brandingData } from '$lib/data/branding';
	import { softwareData } from '$lib/data/software';
	import Wordmark from './Wordmark.svelte';
	import { onDestroy, onMount } from 'svelte';

	let currentFace: 'logo' | 'irl' = 'irl';
	let isAnimating = false;

	let observer: IntersectionObserver;

	onMount(() => {
		const projects = document.querySelectorAll('.project');

		// observe all projects to load them in nicely
		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				}
			});
		});

		projects.forEach((project) => {
			// observe 👁️👁️
			observer.observe(project);

			// load all card images and check when they've loaded to apply the nice blur out animation
			const banner: HTMLImageElement = project.querySelector('.card-image img')!;

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

	onDestroy(() => {
		if (observer) observer.disconnect();
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
			<div>
				<Wordmark />
			</div>
			<p>
				or Clément IRL, a 16 y/o high school student from the south of France. I am passionate about
				computers and express my love through design, code and video.<br /><br />From Discord bots
				to web apps to brand design to livestreaming, anything goes on clembs.com. Welcome!
			</p>
		</div>
	</div>

	<section id="design">
		<h1>Graphic design</h1>

		<ProjectGrid projects={brandingData} />
	</section>

	<section id="software">
		<h1>Software & tools</h1>

		<ProjectGrid projects={softwareData} compact />
	</section>

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
	@media (prefers-reduced-motion) {
		.img-wrapper {
			animation: none !important;
		}
	}

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
		padding: 3rem 0;
		display: flex;
		gap: 2.5rem;
		margin: 0 auto;
		font-size: 1.15rem;

		.avatar {
			cursor: pointer;
			appearance: none;
			border: none;
			position: relative;
			background-color: transparent;
			border-radius: 1rem;
			padding: 0;
			margin: 0;
			width: 8rem;
			height: 8rem;
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
					width: 8rem;
					height: 8rem;
					object-fit: cover;
					border-radius: 999px;
					border: 1px var(--color-on-background) solid;
					// box-shadow: 3px 3px 0px 0px var(--color-on-background);
				}

				&[aria-hidden='false'] {
					&:hover {
						transform: translate(-1px, -1px);
					}
					&:active {
						transform: translate(-4px, -4px);
					}
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
			gap: 1rem;
			max-width: 400px;

			h3,
			p {
				margin: 0;
			}
		}
	}

	section h1 {
		font-size: 2rem;
	}

	@media (max-width: 939px) {
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
