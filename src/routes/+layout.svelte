<script lang="ts">
	import '../styles/globals.scss';
	import { page } from '$app/stores';
</script>

<main>
	<div
		class="background-piece"
		style="--from: {$page.data?.themeGradient?.from ?? '#643FFF'}; --to: {$page.data?.themeGradient
			?.to ?? '#31C0FF'}"
		class:move-gradient={!!$page.data?.themeGradient}
	/>
	<div class="content">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
	}

	.background-piece {
		transition: left 0.5s ease-out;
		background: linear-gradient(to right, #643fff, #31c0ff, var(--from), var(--to));
		// background-image: url('/assets/purplue-gradient.png');
		// background-size: cover;
		width: 300%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		height: 200px;
		z-index: -1;
		border-bottom: 1px solid black;

		&.move-gradient {
			left: -200%;
			transition: left 0.5s ease-out;
		}
	}

	.content {
		margin: 2rem 1rem;
		background-color: white;
		max-width: 1260px;
		border: 1px black solid;
		border-radius: 20px;
		height: 100%;
	}

	@media (max-width: 768px) {
		.content {
			margin: 2rem 0.5rem;
		}
	}
</style>
