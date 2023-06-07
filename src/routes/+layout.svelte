<script lang="ts">
	import '../styles/globals.scss';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/Footer.svelte';
	import type DebugMenu from './DebugMenu.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import ShortcutsModal from './ShortcutsModal.svelte';

	let colors = $page.data?.themeGradient;

	// don't import this right away, it's pretty heavy
	let debugMenu: typeof DebugMenu | null = null;

	page.subscribe((p) => {
		if (p.error) {
			colors = {
				from: '#8a0000',
				to: '#480000',
			};
		}
		if (p.data?.themeGradient) {
			colors = p.data.themeGradient;
		}
	});
</script>

<svelte:window
	on:keydown={async (e) => {
		if (e.key === 'F3') {
			e.preventDefault();
			debugMenu = debugMenu ? null : (await import('./DebugMenu.svelte')).default;
		}
	}}
/>

<MetaTags description="website of clembs. very beta." />

{#if debugMenu}
	<svelte:component this={debugMenu} />
{/if}

<ShortcutsModal />

<Toaster />

<main class="layout">
	<div
		class="background-piece"
		style="--from: {colors?.from ?? '#643FFF'}; --to: {colors?.to ?? '#31C0FF'}"
		class:move-gradient={!!$page.data?.themeGradient || $page.error}
	/>
	<div class="content">
		<slot />

		<Footer />
	</div>

	<NavBar />
</main>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		transition: transform ease-in-out 0.6s, filter ease-in-out 0.4s;
	}

	.background-piece {
		transition: left 0.5s ease-out;
		background: linear-gradient(to right, #643fff, #31c0ff, var(--from), var(--to));
		width: 300%;
		overflow: hidden;
		position: fixed;
		inset: 0;
		pointer-events: none;
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
		width: 100%;
		z-index: 2;
	}

	@media (max-width: 1022.4px) {
		.content {
			margin: 3rem 2rem;
			width: calc(100% - 1.4rem);
		}
	}
</style>
