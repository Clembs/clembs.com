<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		transitionDelay?: number;
		type?: 'hover' | 'click';
		showTooltip?: boolean;
		tooltipContent: Snippet;
		children: Snippet;
	}

	let {
		transitionDelay = 120,
		type = 'hover',
		showTooltip = false,
		tooltipContent,
		children,
	}: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	onfocus={() => (type === 'hover' ? (showTooltip = true) : null)}
	onmouseover={() => (type === 'hover' ? (showTooltip = true) : null)}
	onblur={() => (type === 'hover' ? (showTooltip = false) : null)}
	onmouseleave={() => (type === 'hover' ? (showTooltip = false) : null)}
	onclick={() => (type === 'click' ? (showTooltip = true) : null)}
	onkeydown={(ev) => (ev.key === 'Enter' && type === 'click' ? (showTooltip = true) : null)}
	class="tooltip-container {type}"
	style="--transition-delay: {transitionDelay}ms"
>
	{@render children()}

	{#if showTooltip}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<span
			in:fly={{
				delay: transitionDelay,
				duration: 100,
				y: 10,
			}}
			onkeypress={(ev) => {
				console.log(ev.key);
				if (ev.key === 'Escape') {
					showTooltip = false;
				}
			}}
			class="tooltip-content"
			role="tooltip"
		>
			{@render tooltipContent()}
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
