<script lang="ts">
	import '../styles/globals.scss';
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/Footer.svelte';
	import type DebugMenu from './DebugMenu.svelte';
	import ShortcutsModal from './ShortcutsModal.svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	export let data: LayoutData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

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

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
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

<main>
	<slot />
</main>
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

	main {
		margin: 0 auto;
		max-width: 1000px;
		height: 100%;
		width: 100%;
		z-index: 2;
		position: relative;
	}
</style>
