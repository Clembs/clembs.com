<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ProjectGrid from '$lib/components/Projects/ProjectGrid.svelte';
	import { brandingData } from '$lib/data/branding';
	import { softwareData } from '$lib/data/software';
	import { onDestroy, onMount } from 'svelte';
	import IconArrowRight from '@tabler/icons-svelte/dist/svelte/icons/IconArrowRight.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ToggleAvatar from '$lib/components/ToggleAvatar.svelte';
	import SoftwareGrid from '$lib/components/Projects/SoftwareGrid.svelte';

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

<MetaTags
	description="Hi to meet you, I'm Clembs, a student from the south of France. I am passionate about computers
and express my love through design, code and video. Welcome to clembs.com!"
/>

<main>
	<header class="intro">
		<div class="intro-text">
			<h1>
				Worlds made from<br />
				design, code and heart.
			</h1>

			<div class="buttons">
				<Button href="#design">View projects</Button>
				<Button href="/contact" disabled style="outlined">Contact me</Button>
			</div>
		</div>

		<ToggleAvatar />

		<!-- <div class="text">
			<h3>Nice to meet you, I'm</h3>
			<div>
				<Wordmark />
			</div>
			<p>
				or Clément IRL, a 17 y/o student from the south of France. I am passionate about computers
				and express my love through design, code and video.<br /><br />From Discord bots to web apps
				to brand design to livestreaming, anything goes on clembs.com. Welcome!
			</p>
		</div> -->
	</header>

	<section id="design">
		<header>
			<div class="top">
				<h2>Graphic design</h2>

				<Button style="outlined" href="/projects#design">View more <IconArrowRight /></Button>
			</div>
		</header>

		<ProjectGrid projects={brandingData.slice(0, 3)} compact loaded={false} />
	</section>

	<section id="software">
		<header>
			<div class="top">
				<h2>Apps & tools</h2>

				<Button style="outlined" href="/projects#software">View more <IconArrowRight /></Button>
			</div>
		</header>

		<SoftwareGrid projects={softwareData.slice(0, 3)} loaded={false} />
	</section>

	<span
		aria-hidden="true"
		style="
	opacity: 0.15;
	color: white;
	text-align: left;
	transform: rotateY(180deg);
	"
	>
		Strange, isn't it?
	</span>
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
		padding: 5rem 0;
		display: flex;
		gap: 1rem;
		font-size: clamp(1rem, 2vw, 1.15rem);
		justify-content: space-between;
		align-items: center;

		&-text {
			h1 {
				font-size: clamp(2rem, 5vw, 3rem);
				line-height: 1.28;
			}

			.buttons {
				display: flex;
				gap: 1rem;
				margin-top: 1rem;
			}
		}

		// .text {
		// 	display: flex;
		// 	flex-direction: column;
		// 	gap: 1rem;
		// 	max-width: 42ch;

		// 	h3,
		// 	p {
		// 		margin: 0;
		// 	}
		// }
	}

	section {
		header {
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			h1 {
				font-size: clamp(1.25rem, 5vw, 2rem);
				margin: 0;
			}
		}
	}

	@media (max-width: 939px) {
		.intro {
			flex-direction: column-reverse;
			align-items: center;
			text-align: center;

			.buttons {
				justify-content: center;
			}
		}
	}
</style>
