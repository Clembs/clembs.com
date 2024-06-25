<section id="info-grid">
	<section class="panel large">Open June 30<br /> — September 30</section>

	<div class="subgrid">
		<section class="panel small green">40 player slots</section>

		<section class="panel small brown">Java Edition 1.20.6, cracks allowed</section>

		<section class="panel small red">Hard mode, plugins enabled</section>
	</div>
</section>

<style lang="scss">
	#info-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 0.5rem;
		width: 100%;

		@media (max-width: 608px) {
			grid-template-columns: 1fr;
		}
	}

	.panel {
		padding: 1rem;
		border-radius: 1rem;
		border: 1px solid var(--color-outline);
		background-color: var(--color-surface);
		font-weight: 500;
		text-align: right;
	}

	.subgrid {
		display: grid;
		grid-template-rows: 1fr 1fr;
		gap: 0.5rem;
	}

	.large {
		font-size: 2.25rem;
		background-color: #a1ccf8;
		position: relative;
		overflow: hidden;
		min-height: 280px;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			right: -50px;
			background-image: url('/assets/smp/cozy-plains.png');
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
			background-position: bottom right;
			background-size: 100%;
		}
	}

	.small {
		font-size: 1.315rem;
		text-wrap: balance;
		display: grid;
		align-items: center;

		&.green {
			background-color: #b4f0cc;
		}
		&.brown {
			background-color: #b8ad9c;
		}
		&.red {
			background-color: #dea8a8;
		}
	}
</style>
