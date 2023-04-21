<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { BrandingPost, Technology } from '$lib/data/branding';

	let minimized = false;
	let manuallyMinimized: boolean | null = null;

	export let data: BrandingPost;

	const technologies: Record<Technology, string> = {
		sveltekit: 'svelte',
		figma: 'figma',
		scss: 'sass',
		tailwindcss: 'tailwindcss',
		google_sites: 'google',
		illustrator: 'adobeillustrator',
		xd: 'adobexd',
		typescript: 'typescript',
		nextjs: 'nextjs'
	};
</script>

<svelte:window
	on:scroll={() => {
		minimized = (document.scrollingElement?.scrollTop || 0) > 200;
	}}
/>

<div class="info-card" class:minimized={manuallyMinimized === null ? minimized : manuallyMinimized}>
	<div class="info-card-content">
		<section id="about">
			<div class="section-title">About</div>
			<span>{data.brief.split(' ').slice(0, 20).join(' ')}...</span>
		</section>
		<section id="date">
			<div class="section-title">Created at</div>
			<time datetime={data.finishedAt.toDateString()}>
				{data.finishedAt.toLocaleString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			</time>
			• Made in {(data.finishedAt.getTime() - data.createdAt.getTime()) / 86_400_000} days
		</section>
		<section id="technologies">
			<div class="section-title">Technologies</div>
			<div class="technologies">
				{#each data.technologies as technology}
					<img
						src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/{technologies[technology]}.svg"
						alt={technology}
					/>
				{/each}
			</div>
		</section>
		<Button inline href={data.url}>Check it out</Button>
	</div>
	<button class="expand" on:click={() => (manuallyMinimized = !manuallyMinimized)}>
		{(manuallyMinimized === null ? minimized : manuallyMinimized) ? 'Minimize' : 'Expand'}
	</button>
</div>

<style lang="scss">
	.info-card {
		margin: 0.5rem;
		border: 1px solid black;
		padding: 0.8rem;
		border-radius: 30px;
		position: sticky;
		top: 0.5rem;
		left: 0;
		background-color: white;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		height: max-content;
		flex-grow: 1;
		min-width: 350px;

		.info-card-content {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			section {
				.section-title {
					text-transform: uppercase;
					font-weight: 700;
					font-size: 0.9rem;
					padding-bottom: 0.3rem;
				}
				.technologies {
					display: flex;
					gap: 0.3rem;

					img {
						width: 32px;
						height: auto;
					}
				}
			}
		}

		@media (min-width: 850px) {
			.expand {
				display: none;
			}
		}

		@media (max-width: 850px) {
			&.minimized {
				.info-card-content {
					flex-direction: row;
					align-items: center;

					#technologies,
					#date {
						display: none;
					}
				}
			}
		}
	}
</style>
