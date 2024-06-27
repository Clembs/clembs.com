<script lang="ts">
	import { fly } from 'svelte/transition';

	export let transitionDelay = 120;
	export let type: 'hover' | 'click' = 'hover';

	export let showTooltip = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	on:focus={() => (type === 'hover' ? (showTooltip = true) : null)}
	on:mouseover={() => (type === 'hover' ? (showTooltip = true) : null)}
	on:blur={() => (type === 'hover' ? (showTooltip = false) : null)}
	on:mouseleave={() => (type === 'hover' ? (showTooltip = false) : null)}
	on:click={() => (type === 'click' ? (showTooltip = true) : null)}
	on:keydown={(ev) => (ev.key === 'Enter' && type === 'click' ? (showTooltip = true) : null)}
	class="tooltip-container {type}"
	style="--transition-delay: {transitionDelay}ms"
>
	<slot />

	{#if showTooltip}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<span
			in:fly={{
				delay: transitionDelay,
				duration: 100,
				y: 10,
			}}
			on:keypress={(ev) => {
				console.log(ev.key);
				if (ev.key === 'Escape') {
					showTooltip = false;
				}
			}}
			class="tooltip-content"
			role="tooltip"
		>
			<slot name="tooltip-content" />
		</span>
	{/if}
</span>

<style lang="scss">
	.tooltip-container {
		position: relative;
		display: inline-block;

		.tooltip-content {
			// pointer-events: none;
			position: absolute;
			bottom: calc(100% + 7px);
			left: 50%;
			background-color: var(--color-background);
			color: var(--color-on-background);
			border: 1px solid var(--color-outline);
			box-shadow: 0 1px 0 0 var(--color-outline);
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			z-index: 9;
			// opacity: 0;
			font-size: 0.9rem;
			transform: translate(-50%);
			// transition: transform 100ms ease, opacity 50ms ease;
			// transition-delay: 100ms;
			inline-size: max-content;
			max-inline-size: 30ch;

			&::before {
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 7px;
				border-color: var(--color-outline) transparent transparent transparent;
			}
		}

		// &.hover:is(:hover, :focus-within) .tooltip-content {
		// 	opacity: 1;
		// 	transform: translate(-50%, 0) scale(1);
		// 	transition-delay: var(--transition-delay);
		// }
	}
</style>
