<script lang="ts">
	import type { Archive } from '$lib/data/archive';
	import Card from '../Card.svelte';

	export let data: Archive;
	export let loaded = false;
</script>

<Card aria-label="View software details: {data.name}" href="/archive/{data.id}">
	<div class="archive" slot="card-content">
		<div
			class="archive-icon-wrapper"
			style="--project-from: {data.themeGradient.from}; --project-to: {data.themeGradient.to}; "
		>
			<div class="archive-icon" style="background-image: url({data.iconThumbnailPath})">
				<img
					loading="lazy"
					src={data.iconPath}
					class:loaded
					alt="{data.name} icon"
					height={48}
					width={48}
				/>
			</div>
			<div class="subtext">
				{data.createdAt.getFullYear()}
			</div>
		</div>
		<div class="about">
			<div class="name">
				{data.name}
			</div>
			<span class="subtext">{data.brief}</span>
		</div>
	</div>
</Card>

<style lang="scss">
	.archive {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		justify-content: center;
		height: 100%;
		min-width: min-content;
		min-height: min-content;

		.archive-icon-wrapper {
			display: flex;
			justify-content: space-between;
			width: 100%;

			.archive-icon {
				width: 3rem;
				height: auto;
				border: 1px solid var(--color-on-background);
				border-radius: 1rem;
				overflow: hidden;
			}
		}

		.about {
			.name {
				font-weight: 500;
				font-size: 1.1rem;
			}
		}
	}
</style>
