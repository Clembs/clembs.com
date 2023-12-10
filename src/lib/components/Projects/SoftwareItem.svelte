<script lang="ts">
	import type { Software } from '$lib/data/software';
	import Card from '../Card.svelte';

	export let data: Software;
	export let index: number;
	export let loaded = false;
</script>

<Card
	aria-label="View software details: {data.name}"
	href="/software/{data.id}"
	style="--delay: {index}"
>
	<div class="software" slot="card-content">
		<div
			class="software-icon-wrapper"
			style="--project-from: {data.themeGradient.from}; --project-to: {data.themeGradient.to}; "
		>
			<div class="software-icon" style="background-image: url({data.iconThumbnailPath})">
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
	.software {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		justify-content: center;
		height: 100%;
		min-width: min-content;
		min-height: min-content;

		.software-icon-wrapper {
			display: flex;
			justify-content: space-between;
			width: 100%;

			.software-icon {
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
