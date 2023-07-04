<script lang="ts">
	import { page } from '$app/stores';
	import type { BrandingPost } from '$lib/data/branding';
	import type { Software } from '$lib/data/software';
	import Clembs from '$lib/icons/Clembs.svelte';
	import { onMount } from 'svelte';

	export let data: BrandingPost | Software;

	const navLinks = [
		{
			href: '/',
		},
		{
			path: '/branding',
			href: '/#design',
			label: 'Design',
		},
		{
			path: '/software',
			href: '/#software',
			label: 'Software',
		},
		{
			href: '/contact',
			label: 'Contact',
		},
	];

	let firstNavEl: HTMLAnchorElement;
	let scrollingOnNavBarEl = '/';
	let designSectionRect: DOMRect;
	let softwareSectionRect: DOMRect;

	function detectHomeSection() {
		if ($page.url.pathname !== '/') return;
		designSectionRect = document.querySelector('section#design')?.getBoundingClientRect()!;
		softwareSectionRect = document.querySelector('section#software')?.getBoundingClientRect()!;

		const designXPosition = {
			top: designSectionRect.top + window.scrollY - 100,
			bottom: designSectionRect.bottom + window.scrollY - 100,
		};

		const softwareXPosition = {
			top: softwareSectionRect.top + window.scrollY - 100,
			bottom: softwareSectionRect.bottom + window.scrollY - 100,
		};

		scrollingOnNavBarEl =
			window.scrollY > designXPosition.top && window.scrollY < designXPosition.bottom
				? '/#design'
				: window.scrollY > softwareXPosition.top && window.scrollY < softwareXPosition.bottom
				? '/#software'
				: '/';
	}

	onMount(detectHomeSection);

	page.subscribe((p) => {
		if (p.url.href.endsWith('/')) {
			scrollingOnNavBarEl = '/';
		}
		navLinks.forEach((link, i) => {
			if (i === 0) return;
			if (
				scrollingOnNavBarEl === link.href ||
				(link?.path ? p.url.href.includes(link.path) : false)
			) {
				scrollingOnNavBarEl = link.href;
			}
		});
	});
</script>

<svelte:window
	on:scroll={detectHomeSection}
	on:keydown={(ev) => {
		if (ev.altKey && ev.key === 'n') {
			ev.preventDefault();
			firstNavEl.focus();
		}
	}}
/>

<nav>
	{#each navLinks as link, i}
		{#if i === 0}
			<a
				bind:this={firstNavEl}
				href={link.href}
				class="nav-item"
				aria-label="Home"
				class:active={scrollingOnNavBarEl === '/'}
			>
				<Clembs />
				<div class="background" />
			</a>
		{:else}
			<a
				href={link.href}
				class="nav-item"
				class:active={scrollingOnNavBarEl === link.href ||
					(link?.path ? $page.url.href.includes(link.path) : false)}
			>
				{link.label}
				<div class="background" />
			</a>
		{/if}
	{/each}
</nav>

<style lang="scss">
	nav {
		position: fixed;
		height: 58px;
		bottom: 1rem;
		border: 1px solid var(--color-on-background);
		background-color: var(--color-background);
		border-radius: 99rem;
		padding: 0.2rem;
		display: flex;
		align-items: center;
		gap: 0.2rem;
		min-width: max-content;
		box-shadow: 0px 2px 0px 0px var(--color-on-background);
		transition: all linear 150ms;
		z-index: 9;

		.nav-item {
			display: flex;
			position: relative;
			color: var(--color-on-background);
			padding: 0rem 1rem;
			border-radius: 99rem;
			height: 100%;
			text-decoration: none;
			font-weight: 400;
			font-variation-settings: 'wght' 400;
			font-size: 1.1rem;
			align-items: center;
			justify-self: center;
			// border: 1px solid white;
			--transition-duration: 250ms;
			--transition: var(--transition-duration) cubic-bezier(0, 0, 0.125, 1);
			transition: font-variation-settings var(--transition), padding var(--transition);

			.background {
				position: absolute;
				height: 100%;
				width: 30px;
				opacity: 0;
				background: var(--main-gradient);
				transition: width var(--transition);
				border-radius: 999px;
				z-index: -1;
				left: 50%;
				transform: translateX(-50%);
			}

			&.active {
				fill: white;
				color: white;
				font-weight: 600;
				font-variation-settings: 'wght' 600;
				// background: var(--main-gradient);
				padding: 0rem 1.5rem;

				.background {
					width: 100%;
					opacity: 1;
				}
			}

			&:hover:not(.active) {
				transition: all ease-out 150ms;
				outline: 1px solid var(--color-on-background);
				background: var(--color-surface);
			}
		}
	}
</style>
