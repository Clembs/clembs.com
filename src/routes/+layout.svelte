<script lang="ts">
	import '../styles/globals.scss';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/Footer.svelte';
	import type DebugMenuComponent from './DebugMenu.svelte';
	import ContentWrapper from '$lib/components/ContentWrapper.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// don't import this right away, it's pretty heavy
	let DebugMenu = $state<typeof DebugMenuComponent>();
</script>

<svelte:window
	onkeydown={async (e) => {
		if (e.key === 'F3') {
			e.preventDefault();
			DebugMenu = DebugMenu ? undefined : (await import('./DebugMenu.svelte')).default;
		}
	}}
/>

{#if DebugMenu}
	<DebugMenu />
{/if}

<Toaster />

<div inert class="background-piece"></div>

<NavBar />

<ContentWrapper>
	{@render children?.()}
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
