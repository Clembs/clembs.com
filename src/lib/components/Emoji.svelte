<script lang="ts">
	import { emojiList } from '$lib/helpers/parseMentions';
	import Tooltip from './Tooltip.svelte';

	export let src: string;
	export let name: string;
</script>

<Tooltip transitionDelay={500}>
	<span slot="tooltip-content">
		<div class="about">
			<img aria-label=":{name}:" draggable="false" class="emoji big" {src} alt=":{name}:" />
			<div class="about-text">
				<div class="title">
					:{name}:
				</div>
				{#if emojiList.includes(name)}
					<div class="subtext">Type it in your comments to use.</div>
				{/if}
			</div>
		</div>
	</span>
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
