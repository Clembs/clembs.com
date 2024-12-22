<script lang="ts">
	import '../styles/globals.scss';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/Footer.svelte';
	import type DebugMenu from './DebugMenu.svelte';
	import ContentWrapper from '$lib/components/ContentWrapper.svelte';

	// don't import this right away, it's pretty heavy
	let debugMenu: typeof DebugMenu | null = null;
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

<Toaster />

<div inert class="background-piece" />

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
		background: linear-gradient(to right, #643fff, #31c0ff);
		filter: blur(50px);
		z-index: -1;
		position: fixed;
		opacity: 0.5;
	}
</style>
