<script lang="ts">
	import '../styles/globals.scss';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/Footer.svelte';
	import type DebugMenu from './DebugMenu.svelte';
	import ShortcutsModal from '../lib/components/ShortcutsModal/ShortcutsModal.svelte';
	import { interpolate } from 'd3-interpolate';
	import { tweened } from 'svelte/motion';

	const baseColors = {
		from: '#643FFF',
		to: '#31C0FF',
	};

	let colors = $page.data?.themeGradient ?? baseColors;

	// this is literally too easy
	const colorProgress = tweened(colors, {
		interpolate: interpolate,
	});

	// don't import this right away, it's pretty heavy
	let debugMenu: typeof DebugMenu | null = null;

	page.subscribe(({ error, data }) => {
		if (error) {
			colorProgress.set({
				from: '#8a0000',
				to: '#480000',
			});
		} else {
			colorProgress.set(data?.themeGradient ?? baseColors);
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
	inert
	class="background-piece"
	style="--from: {$colorProgress.from}; --to: {$colorProgress.to}"
/>

<NavBar />

<div class="content">
	<slot />
</div>
<Footer />

<style lang="scss">
	.background-piece {
		position: absolute;
		pointer-events: none;

		top: -35px;
		left: -10%;
		width: 120%;
		height: 20px;

		background: linear-gradient(to right, var(--from), var(--to));
		filter: blur(30px);
	}

	.content {
		margin: 0 auto;
		max-width: 1000px;
		width: 100%;
		z-index: 2;
		position: relative;
		// border-left: 1px solid var(--color-outline);
		// border-right: 1px solid var(--color-outline);
	}
</style>
