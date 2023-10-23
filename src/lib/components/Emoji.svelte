<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	export let src: string;
	export let name: string;
</script>

<Tooltip transitionDelay={500}>
	<span slot="tooltip-content">:{name}:</span>
	<img aria-label=":{name}:" draggable="false" class="emoji" {src} alt=":{name}:" />
</Tooltip>

<style lang="scss">
	.emoji {
		display: inline-block;
		object-fit: contain;
		width: 1.315em;
		height: 1.315em;
		vertical-align: bottom;
		image-rendering: optimizequality;
		vertical-align: bottom;
	}
</style>
