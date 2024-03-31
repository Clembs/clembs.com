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
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

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

	function roundContentCorners() {
		if (browser) {
			const content = document.querySelector('.content');
			const contentRect = content?.getBoundingClientRect();

			if (!content || !contentRect) return;

			if (contentRect.bottom < window.innerHeight) {
				content.classList.add('close-in');
			} else {
				content.classList.remove('close-in');
			}
		}
	}

	page.subscribe(({ error, data }) => {
		if (error) {
			colorProgress.set({
				from: '#8a0000',
				to: '#480000',
			});
		} else {
			colorProgress.set(data?.themeGradient ?? baseColors);
		}
		roundContentCorners();
	});

	onMount(roundContentCorners);
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

<div class="content">
	<NavBar />
	<slot />

	<Footer />
</div>

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

	.content {
		margin: 0 auto;
		max-width: 750px;
		width: 100%;
		margin-top: 2rem;
		z-index: 2;
		position: relative;
		border-radius: 2rem 2rem 0 0;
		border: 1px solid var(--color-outline);

		&:global(.close-in) {
			border-radius: 2rem;
		}
	}
</style>
