<script lang="ts">
	import { allPosts } from '$lib/data/blog';
	import { archives } from '$lib/data/archive';
	import {
		IconBrush,
		IconCode,
		IconHeart,
		IconMessageCircle,
		IconBallpen,
		IconAt,
	} from '@tabler/icons-svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ArchiveItem from '$lib/components/Projects/ArchiveItem.svelte';
	import BlogPost from '$lib/components/Projects/BlogPost.svelte';
	import Card from '$lib/components/Card.svelte';
	import FeaturedBlogPost from '$lib/components/Projects/FeaturedBlogPost.svelte';
	import Cta from './CTA.svelte';

	const designPosts = allPosts.filter(({ categoryId }) => categoryId === 'design');
</script>

<MetaTags
	description="Hi to meet you, I'm Clembs, a student from the south of France. I am passionate about computers
and express my love through design, code and video. Welcome to clembs.com!"
/>

<header id="intro">
	<div class="intro-text">
		<h1>
			<span>
				Worlds made from<br />
			</span>
			<span>
				<mark style="--color: 255, 100%, 73%">
					<IconBrush />
					design
				</mark>,
				<mark style="--color: 0, 0%, 43%">
					<IconCode />
					code
				</mark>
			</span>
			<span>
				and
				<mark style="--color: 0, 100%, 73%">
					<IconHeart />
					heart
				</mark>.
			</span>
		</h1>

		<div class="buttons">
			<Cta />
			<!-- <Button href="/contact">Contact me - Available for hire!</Button> -->
		</div>
	</div>
</header>

<section id="coming-soon">
	<h3>More recent case studies coming soon!</h3>

	<p>
		This hasn't been updated in a while because I've been hard at work in school and outside cooking
		some new projects. I can't wait to share them with you! In the meantime, feel free to check out
		my latest work below.
	</p>
</section>

<section id="projects">
	<FeaturedBlogPost data={designPosts[0]} />
	<div id="project-grid">
		{#each designPosts.slice(1, 3) as post, i}
			<BlogPost data={post} />
			{#each archives.slice(i * 3, i * 3 + 3) as archive, i}
				<ArchiveItem loaded data={archive} />
			{/each}
		{/each}
	</div>
	<div id="quick-links">
		<Card href="/blog">
			<div class="link" slot="card-content">
				<IconBallpen />
				Blog
			</div>
		</Card>
		<!-- <Card href="/projects#design">
			<div class="link" slot="card-content">
				<IconBrush />
				All design
			</div>
		</Card> -->
		<Card href="/contact">
			<div class="link" slot="card-content">
				<IconAt />
				Contact
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

<!-- <section id="about-me">
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
</section> -->

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
			padding-top: 2rem;
			padding-bottom: 3rem;
			position: relative;

			h1 {
				font-size: clamp(2.5rem, 5vw, 2.9rem);
				line-height: 1.315;

				mark {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					background: hsla(var(--color), 0.1);
					color: var(--color-on-background);
					border: 2px solid hsl(var(--color));
					padding: 0.125rem 0.75rem 0.125rem 0.5rem;
					border-radius: 99rem;

					:global(svg) {
						width: 0.9em;
						height: 0.9em;
					}
				}

				@media (max-width: 645px) {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					text-align: left;
				}
			}

			@media (max-width: 645px) {
				padding: 1rem;
				align-self: flex-start;
			}

			.buttons {
				display: flex;
				gap: 0.5rem;
				margin-top: 2rem;
				justify-content: center;

				@media (max-width: 645px) {
					justify-content: flex-start;
				}
			}
		}
	}

	#coming-soon {
		h3 {
			text-align: center;
			margin-bottom: 0.5rem;
		}
		padding: 1.5rem 1rem;
		margin: 0 auto;
	}

	#projects {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		#project-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
			grid-template-rows: 1fr;
			gap: 1rem;

			:global(.card.blog-post) {
				grid-row: span 2;
			}

			:global(.card.archive-item) {
				grid-row: span 1;
			}
		}

		#quick-links {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1rem;
			width: 100%;

			.link {
				display: flex;
				gap: 0.75rem;
				font-size: clamp(1rem, 3vw, 1.25rem);
				font-weight: 500;
				align-items: center;
				justify-content: center;
				text-align: center;

				@media (max-width: 645px) {
					flex-direction: column;
				}
			}
		}
	}

	// #about-me {
	// 	display: flex;
	// 	gap: 2rem;
	// 	justify-content: space-between;
	// 	width: 100%;
	// 	align-items: center;
	// 	flex-wrap: wrap;

	// 	header {
	// 		max-width: 70ch;

	// 		h2 {
	// 			margin-bottom: 1rem;
	// 		}

	// 		ul {
	// 			margin: 0;

	// 			li {
	// 				margin-bottom: 0;
	// 			}
	// 		}
	// 	}
	// }

	section {
		padding: 1.5rem 1rem;
		margin: 0 auto;
		// border-top: 1px solid var(--color-outline);

		// header {
		// h2 {
		// 	font-size: clamp(1.25rem, 5vw, 2rem);
		// 	margin: 0;
		// 	flex: 1;
		// }
		// }
	}
</style>
