<script lang="ts">
	import { blogArticles } from '$lib/data/blog-articles';
	import { projects } from '$lib/data/projects';
	import { IconBrush, IconCode, IconHeart } from '@tabler/icons-svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Cta from './CTA.svelte';
	import Project from '$lib/components/Projects/Project.svelte';
	import CaseStudyArticle from '$lib/components/Projects/CaseStudyArticle.svelte';
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

		<Cta />
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
	<div id="project-grid">
		{#each blogArticles.filter((c) => c.categoryId === 'work').slice(1, 3) as article, i}
			<CaseStudyArticle orientation="vertical" {article} />
			{#each projects.slice(i * 3, i * 3 + 3) as project, i}
				<Project {project} />
			{/each}
		{/each}
	</div>
</section>

<!-- <section id="work">
	<h2>Projects</h2>

	{#each [...projects, ...blogArticles.filter((b) => b.categoryId === 'work')]
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.map((p) => {
			console.log([...projects, ...blogArticles].length);
			return p;
		}) as post}
		{#if 'categoryId' in post}
			<DesignArticle article={post} />
		{:else if 'brief' in post}
			<ArchiveItem project={post} />
		{/if}
	{/each}
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
			width: 100%;

			h1 {
				font-size: clamp(2rem, 7vw, 2.75rem);
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
		}
	}

	#coming-soon {
		h3 {
			text-align: center;
			margin-bottom: 0.5rem;
		}
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
	}

	// #work {
	// 	display: flex;
	// 	flex-direction: column;
	// 	gap: 2rem;
	// }

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
