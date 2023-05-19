<script lang="ts">
	import '../styles/globals.scss';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';

	let colors = $page.data?.themeGradient;

	page.subscribe((p) => {
		if (p.data?.themeGradient) {
			colors = p.data.themeGradient;
		}
	});
</script>

<main>
	<div
		class="background-piece"
		style="--from: {colors?.from ?? '#643FFF'}; --to: {colors?.to ?? '#31C0FF'}"
		class:move-gradient={!!$page.data?.themeGradient}
	/>
	<div class="content">
		<slot />
	</div>

	<NavBar />
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		background: white;
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
		border-bottom: 1px solid black;

		&.move-gradient {
			left: -200%;
			transition: left 0.5s ease-out;
		}
	}

	.content {
		margin: 3rem 2rem 1rem 2rem;
		background-color: white;
		max-width: 1000px;
		border: 1px black solid;
		border-radius: 1rem;
		height: 100%;
		z-index: 2;
	}

	@media (max-width: 768px) {
		.content {
			margin: 2rem 0.7rem;
		}
	}
</style>
