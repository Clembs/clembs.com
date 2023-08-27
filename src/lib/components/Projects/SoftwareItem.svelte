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
				<img loading="lazy" src={data.iconPath} class:loaded alt="{data.name} icon" />
			</div>
		</div>
		<div class="about">
			<div class="name">
				{data.name}
			</div>
			<span class="category">{data.category}</span>
		</div>
	</div>
</Card>

<style lang="scss">
	.software {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		height: 100%;
		min-width: min-content;
		min-height: min-content;

		.software-icon-wrapper {
			display: flex;

			.software-icon {
				width: 3rem;
				height: auto;
				border: 1px solid var(--color-on-background);
				border-radius: 1rem;
				overflow: hidden;
			}
		}

		.about {
			display: flex;
			flex-direction: column;

			.name {
				font-weight: 500;
			}

			.category {
				font-size: 0.85rem;
				color: var(--color-on-surface);
			}
		}
	}
</style>
