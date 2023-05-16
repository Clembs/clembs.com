<script lang="ts">
	import type { BrandingPost } from '$lib/data/branding';
	import { technologies } from '$lib/data/technologies';

	let minimized = false;
	let manuallyMinimized: boolean | null = null;

	export let data: BrandingPost;
</script>

<svelte:window
	on:scroll={() => {
		minimized = (document.scrollingElement?.scrollTop || 0) > 200;
	}}
/>

<aside
	class="info-card"
	class:minimized={manuallyMinimized === null ? minimized : manuallyMinimized}
>
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
			• made in {(data.finishedAt.getTime() - data.createdAt.getTime()) / 86_400_000} days
		</section>
		<section id="technologies">
			<div class="section-title">Technologies</div>
			<div class="technologies">
				{#each data.technologies.map((t) => technologies[t]) as technology}
					<img
						title={technology.name}
						draggable="false"
						src={technology.iconUrl}
						alt={technology.name}
					/>
				{/each}
			</div>
		</section>
		<!-- <Button inline href={data.url}>Check it out</Button> -->
	</div>
	<button class="expand" on:click={() => (manuallyMinimized = !manuallyMinimized)}>
		{(manuallyMinimized === null ? minimized : manuallyMinimized) ? 'Minimize' : 'Expand'}
	</button>
</aside>

<style lang="scss">
	.info-card {
		border-left: 1px solid black;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-width: 350px;

		.info-card-content {
			display: flex;
			flex-direction: column;
			position: sticky;
			top: 1rem;
			left: 0;
			gap: 1rem;

			section {
				.section-title {
					font-weight: 600;
					font-size: 0.9rem;
					padding-bottom: 0.3rem;
					user-select: none;
				}
				.technologies {
					display: flex;
					gap: 0.3rem;
					user-select: none;

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
