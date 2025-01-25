<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	interface Props {
		src: string;
		name: string;
	}

	let { src, name }: Props = $props();
</script>

<Tooltip transitionDelay={500}>
	{#snippet tooltipContent()}
		<div class="about">
			<img aria-label=":{name}:" draggable="false" class="emoji big" {src} alt=":{name}:" />
			<div class="about-text">
				<div class="title">
					:{name}:
				</div>
			</div>
		</div>
	{/snippet}

	<img aria-label=":{name}:" draggable="false" class="emoji" {src} alt=":{name}:" />
</Tooltip>

<style lang="scss">
	.about {
		display: flex;
		gap: 1rem;
		align-items: center;

		.title {
			font-size: 1rem;
			font-weight: 500;
		}
	}

	.emoji {
		display: inline-block;
		object-fit: contain;
		width: 1.315em;
		height: 1.315em;
		vertical-align: bottom;
		image-rendering: optimizequality;
		vertical-align: bottom;

		&.big {
			width: 2.5rem;
			height: 2.5rem;
		}
	}
</style>
