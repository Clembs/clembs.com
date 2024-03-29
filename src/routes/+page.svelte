<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { allPosts } from '$lib/data/blog';
	import { softwareData } from '$lib/data/software';
	import { IconMessageCircle, IconBrush, IconCode } from '@tabler/icons-svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ToggleAvatar from '$lib/components/ToggleAvatar.svelte';
	import SoftwareItem from '$lib/components/Projects/SoftwareItem.svelte';
	import BlogPostCard from '$lib/components/Projects/BlogPost.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<MetaTags
	description="Hi to meet you, I'm Clembs, a student from the south of France. I am passionate about computers
and express my love through design, code and video. Welcome to clembs.com!"
/>

<header id="intro">
	<div class="intro-text">
		<h1>
			Worlds made from<br />
			design, code and heart.
		</h1>

		<div class="buttons">
			<Button href="#projects">View projects</Button>
			<Button href="/contact" style="outlined">Contact me</Button>
		</div>
	</div>
</header>

<section id="projects">
	<div id="project-grid">
		{#each allPosts.slice(0, 3) as design, i}
			{#if i % 2 === 0}
				<div class="grid-item">
					<BlogPostCard loaded data={design} />
				</div>
				<div class="grid-item columns">
					{#each softwareData.slice(i * 2, i * 2 + 2) as software, i}
						<SoftwareItem loaded data={software} index={i} />
					{/each}
				</div>
			{:else}
				<div class="grid-item columns">
					{#each softwareData.slice(i * 2, i * 2 + 2) as software, i}
						<SoftwareItem loaded data={software} index={i} />
					{/each}
				</div>
				<div class="grid-item">
					<BlogPostCard loaded data={design} />
				</div>
			{/if}
		{/each}
	</div>
	<div id="quick-links">
		<Card href="/projects#software">
			<div class="link" slot="card-content">
				<IconCode />
				All projects
			</div>
		</Card>
		<Card href="/projects#design">
			<div class="link" slot="card-content">
				<IconBrush />
				All design
			</div>
		</Card>
		<Card href="/comments">
			<div class="link" slot="card-content">
				<IconMessageCircle />
				Comments
			</div>
		</Card>
	</div>
</section>

<section id="about-me">
	<header>
		<h2>A little about me</h2>

		<p>Nice to meet you, I'm Clément "Clembs", a 17 y/o student from the south of France.</p>
		<ul>
			<li>I'm a student in a Computer Science university in Toulouse, France.</li>
			<li>I'm primarily coding in TypeScript, and I'm currently learning Go.</li>
			<li>
				My website launched in 2020 to showcase design and programming projects. It's been reworked
				a few times, with this version being coded with <a
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noopener noreferrer">SvelteKit</a
				>, which is a blessing to use.<br />
			</li>
		</ul>
	</header>

	<ToggleAvatar />
</section>

<span
	aria-hidden="true"
	style="
	opacity: 0.15;
	color: var(--color-background);
	text-align: left;
	transform: rotateY(180deg);
	"
>
	Strange, isn't it?
</span>

<style lang="scss">
	#intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		.intro-text {
			padding: 3rem 0;
			position: relative;

			h1 {
				font-size: clamp(1.75rem, 7vw, 3rem);
				line-height: 1.25;
			}

			.buttons {
				display: flex;
				gap: 1rem;
				margin-top: 1rem;
				justify-content: center;
			}
		}
	}

	#projects {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		#project-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
			gap: 1rem;

			.grid-item {
				&.columns {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(min(450px, 100%), 1fr));
					gap: 1rem;
				}
			}
		}

		#quick-links {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1rem;
			width: 100%;

			.link {
				display: flex;
				gap: 0.25rem;
				font-size: clamp(1rem, 3vw, 1.25rem);
				font-weight: 500;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				text-align: center;
			}
		}
	}

	#about-me {
		display: flex;
		gap: 2rem;
		justify-content: space-between;
		width: 100%;
		align-items: center;
		flex-wrap: wrap;

		header {
			max-width: 70ch;

			h2 {
				margin-bottom: 1rem;
			}

			ul {
				margin: 0;

				li {
					margin-bottom: 0;
				}
			}
		}
	}

	section {
		padding: 1.5rem 1rem;
		max-width: 890px;
		margin: 0 auto;
		// border-top: 1px solid var(--color-outline);

		header {
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			h2 {
				font-size: clamp(1.25rem, 5vw, 2rem);
				margin: 0;
				flex: 1;
			}
		}
	}

	// @media (max-width: 939px) {
	// 	.intro {
	// 		align-items: center;
	// 		text-align: center;
	// 	}
	// }
</style>
