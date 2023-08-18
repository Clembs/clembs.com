<script lang="ts">
	import type { Software } from '$lib/data/software';
	import Card from '../Card.svelte';

	export let data: Software;
	export let index: number;
	export let loaded = false;
</script>

<Card
	class="card project"
	aria-label="View software details: {data.name}"
	href="/software/{data.id}"
	style="--delay: {index}"
>
	<div
		class="software-icon-wrapper"
		style="--project-from: {data.themeGradient.from}; --project-to: {data.themeGradient.to}; "
	>
		<div class="software-icon" style="background-image: url({data.iconThumbnailPath})">
			<img src={data.iconPath} class:loaded alt="{data.name} icon" loading="lazy" />
		</div>
	</div>
	<div slot="card-content" class="software">
		<div class="about">
			<h3>
				{data.name}
			</h3>
			<p>{data.category}</p>
		</div>
		<time datetime={data.createdAt.toDateString()}>
			{data.createdAt.toLocaleString('en-US', {
				month: 'long',
				year: 'numeric',
			})}
		</time>
	</div>
</Card>

<style lang="scss">
	.software-icon-wrapper {
		height: 7rem;
		display: grid;
		place-items: center;
		width: 100%;
		background: linear-gradient(to right, var(--project-from), var(--project-to));
		border-bottom: 1px solid var(--color-on-background);

		.software-icon {
			width: 5rem;
			height: 5rem;
			border: 1px solid var(--color-on-background);
			border-radius: 1.5rem;
			overflow: hidden;
		}
	}

	.software {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.about > * {
			margin: 0.25rem 0;
		}
	}
</style>
