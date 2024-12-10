<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="cta">
	<div class="left">
		<div class="circle" aria-hidden="true"></div>

		En recherche de stage pour avril-juin 2025
	</div>

	<Button href="https://c.clembs.com/files/389533db63ad437adb.pdf">Voir mon CV (Français)</Button>
</div>

<style lang="scss">
	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;

		padding: 0.25rem;
		padding-left: 1rem;

		margin-top: 2rem;

		background-color: var(--color-background);
		border-radius: 99rem;
		border: 1px solid var(--color-outline);
		font-size: 1.125rem;
		font-weight: 500;

		.left {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: left;
			gap: 0.5rem;
			text-wrap: balance;

			.circle {
				width: 1rem;
				height: 1rem;
				border-radius: 99rem;
				background-color: var(--color-success);
				will-change: transform;
				animation: pulse 3s infinite;
				flex-shrink: 0;
			}
		}

		@media (max-width: 645px) {
			width: 100%;
			border-radius: 1.5rem;
			padding: 0.75rem;
			flex-direction: column;
		}
	}
</style>
