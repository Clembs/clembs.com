<script lang="ts">
	import '../styles/globals.scss';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/Footer.svelte';
	import type DebugMenu from './DebugMenu.svelte';
	import ShortcutsModal from '../lib/components/ShortcutsModal/ShortcutsModal.svelte';

	let colors = $page.data?.themeGradient;

	// don't import this right away, it's pretty heavy
	let debugMenu: typeof DebugMenu | null = null;

	page.subscribe(({ error, data }) => {
		if (error) {
			colors = {
				from: '#8a0000',
				to: '#480000',
			};
		}
		if (data?.themeGradient) {
			colors = data.themeGradient;
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

{#if debugMenu}
	<svelte:component this={debugMenu} />
{/if}

<ShortcutsModal />

<Toaster />

<div
	class="background-piece"
	style="--from: {colors?.from ?? '#643FFF'}; --to: {colors?.to ?? '#31C0FF'}"
	class:move-gradient={!!$page.data?.themeGradient || $page.error}
/>

<NavBar />

<div class="content">
	<slot />
</div>
<Footer />

<style lang="scss">
	.background-piece {
		transition: left 0.5s ease-out;
		background: linear-gradient(to right, #643fff, #31c0ff, var(--from), var(--to));
		width: 300%;
		overflow: hidden;
		position: fixed;
		inset: 0;
		pointer-events: none;
		height: 20px;
		filter: blur(30px);
		top: -50px;
		z-index: 10;
		scale: 1.3;

		&.move-gradient {
			left: -200%;
			transition: left 0.5s ease-out;
		}
	}

	.content {
		margin: 0 auto;
		max-width: 1000px;
		width: 100%;
		z-index: 2;
		position: relative;
		border-left: 1px solid var(--color-outline);
		border-right: 1px solid var(--color-outline);
	}
</style>
