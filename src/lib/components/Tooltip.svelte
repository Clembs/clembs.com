<script lang="ts">
	export let transitionDelay = 120;
</script>

<div class="tooltip-container" style="--transition-delay: {transitionDelay}ms">
	<slot />

	<div class="tooltip-content" role="tooltip">
		<slot name="tooltip-content" />
	</div>
</div>

<style lang="scss">
	.tooltip-container {
		position: relative;
		display: inline-block;

		.tooltip-content {
			pointer-events: none;
			position: absolute;
			bottom: calc(100% + 7px);
			left: 50%;
			background-color: var(--color-background);
			color: var(--color-on-background);
			border: 1px solid var(--color-outline);
			box-shadow: 0 1px 0 0 var(--color-outline);
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			z-index: 1;
			opacity: 0;
			font-size: 0.9rem;
			transform: translate(-50%, 10px) scale(0.9);
			transition: transform 100ms ease, opacity 50ms ease;
			transition-delay: 100ms;
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

		&:is(:hover, :focus-within) .tooltip-content {
			opacity: 1;
			transform: translate(-50%, 0) scale(1);
			transition-delay: var(--transition-delay);
		}
	}
</style>
