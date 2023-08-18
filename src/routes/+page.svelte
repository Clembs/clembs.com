<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ProjectGrid from '$lib/components/Projects/ProjectGrid.svelte';
	import { brandingData } from '$lib/data/branding';
	import { softwareData } from '$lib/data/software';
	import { onDestroy, onMount } from 'svelte';
	import Wordmark from './Wordmark.svelte';
	import IconArrowRight from '@tabler/icons-svelte/dist/svelte/icons/IconArrowRight.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ToggleAvatar from '$lib/components/ToggleAvatar.svelte';

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
	<div class="intro">
		<ToggleAvatar />

		<div class="text">
			<h3>Nice to meet you, I'm</h3>
			<div>
				<Wordmark />
			</div>
			<p>
				or Clément IRL, a 17 y/o student from the south of France. I am passionate about computers
				and express my love through design, code and video.<br /><br />From Discord bots to web apps
				to brand design to livestreaming, anything goes on clembs.com. Welcome!
			</p>
		</div>
	</div>

	<section id="design">
		<header>
			<div class="top">
				<h1>Graphic design</h1>

				<Button style="outlined" href="/branding">View more <IconArrowRight /></Button>
			</div>

			<p>
				I've been into design for 4 years now, sourcing inspiration by the digital worlds to craft
				interfaces and brand identities that look good and stick to people.
			</p>
		</header>

		<ProjectGrid projects={brandingData.slice(0, 3)} compact loaded={false} />
	</section>

	<section id="software">
		<header>
			<div class="top">
				<h1>Apps & tools</h1>

				<Button style="outlined" href="/software">View more <IconArrowRight /></Button>
			</div>

			<p>
				Computers have been my thing forever, and I made coding my newfound passion. Having
				graduated on July 2023, I will be moving to Toulouse to study for a Bachelor of Computer
				Technology (BUT Informatique) in order to fullfill my dream of becoming a professional
				programmer!
			</p>
		</header>

		<ProjectGrid projects={softwareData.slice(0, 3)} compact loaded={false} />
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
		padding: 3rem 0;
		display: flex;
		gap: 2.5rem;
		margin: 0 auto;
		font-size: clamp(1rem, 2vw, 1.15rem);

		.text {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-width: 42ch;

			h3,
			p {
				margin: 0;
			}
		}
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
			p {
				text-wrap: balance;
				max-width: 70ch;
			}
		}
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
