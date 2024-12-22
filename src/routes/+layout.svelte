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
	import ContentWrapper from '$lib/components/ContentWrapper.svelte';

	const baseColors = {
		from: '#643FFF',
		to: '#31C0FF',
	};

	let colors = $page.data?.themeGradient ?? baseColors;

	// this is literally too easy
	const colorProgress = tweened<typeof $page.data.themeGradient>(colors, {
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
	style="--from: {$colorProgress?.from}; --to: {$colorProgress?.to}"
/>

<NavBar />

<ContentWrapper>
	<slot />
</ContentWrapper>

<Footer />

<style lang="scss">
	.background-piece {
		pointer-events: none;
		top: -40px;
		left: -10%;
		width: 120%;
		height: 50px;
		background: linear-gradient(to right, var(--from), var(--to));
		filter: blur(50px);
		z-index: -1;
		position: fixed;
		opacity: 0.5;
	}
</style>
