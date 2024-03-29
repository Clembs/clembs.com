<script lang="ts">
	import type { Archive } from '$lib/data/archive';
	import Card from '../Card.svelte';

	export let data: Archive;
	export let loaded = false;
</script>

<Card aria-label="View software details: {data.name}" href={data.links.projectUrl}>
	<div class="archive-wrapper" slot="card-content">
		<div class="archive">
			<img
				loading="lazy"
				src={data.iconPath}
				class:loaded
				alt="{data.name} icon"
				height={48}
				width={48}
				style="background-image: url({data.iconThumbnailPath})"
				class="archive-icon"
			/>
			<div class="about">
				<div class="name-and-summary">
					<div class="name">
						{data.name}
					</div>
					<div class="subtext">{data.brief}</div>
				</div>

				<!-- <time class="subtext" datetime={data.createdAt.toISOString()}>
					{data.createdAt.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
					})}
				</time> -->
			</div>
		</div>
	</div>
</Card>

<style lang="scss">
	.archive-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		.archive {
			display: flex;
			gap: 1rem;
			width: 100%;

			.archive-icon {
				border: 1px solid var(--color-on-background);
				border-radius: 0.75rem;
			}

			.about {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
				.name {
					font-weight: 500;
					font-size: 1.1rem;
				}
			}
		}
	}
</style>
