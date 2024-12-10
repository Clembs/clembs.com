<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';
	import { IconArrowLeft, IconLogin } from '@tabler/icons-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import GradientAvatar from './GradientAvatar/GradientAvatar.svelte';
	import { onMount } from 'svelte';

	let navbarEl: HTMLElement;
	let scaleFactor = 1;
	let brightness = 1;

	// progressively animate the navbar as the user scrolls closer to the page top (100px to 0px)
	// brightness should be raised from 0.75 to 1
	// scale should be raised from 0.85 to 1
	function scroll() {
		// if the "cards" view isn't active, don't bother
		if (matchMedia('(max-width: 750px)').matches) return;

		const scrollProgress = Math.min(window.scrollY / 100, 1);

		scaleFactor = 0.85 + (1 - scrollProgress) * 0.15;
		brightness = 0.75 + (1 - scrollProgress) * 0.25;
	}

	// if the user focuses on something within the footer, scroll to the bottom of the page
	function focus() {
		window.scrollBy({
			top: 0,
			behavior: 'smooth',
		});
	}

	onMount(() => {
		scroll();

		// check all focusable elements
		navbarEl.querySelectorAll('a, button').forEach((el) => {
			el.addEventListener('focus', focus);
		});
	});
</script>

<svelte:window on:scroll={scroll} />

<nav bind:this={navbarEl} style:scale={scaleFactor} style:filter="brightness({brightness})">
	{#if $page.data.navButton || $page.url.pathname !== '/'}
		<a
			href={$page.data.navButton?.href || '/'}
			class="side-button"
			id="back"
			in:fly={{
				duration: 200,
				easing: cubicInOut,
				x: 20,
			}}
			out:fly={{
				duration: 150,
				easing: cubicInOut,
				x: -20,
			}}
		>
			<div class="arrow">
				<IconArrowLeft stroke={1.5} />
			</div>
			{$page.data.navButton ? $page.data.navButton.label || 'Back' : 'Home'}
		</a>
	{/if}

	<a href="/" id="profile">
		<Clembs />
	</a>

	{#if ['/comments', '/blog', '/settings'].some((path) => $page.url.href.includes(path))}
		<a href="/account" id="account" class="side-button">
			{#if $page.data.userData}
				<GradientAvatar user={$page.data.userData} size="1.5rem" />
				Settings
			{:else}
				<div class="arrow">
					<IconLogin stroke={1.5} />
				</div>
				Sign in
			{/if}
		</a>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 1rem;

		// peeping card view
		position: sticky;
		inset: 0;
		top: 1rem;
		z-index: 1;
		max-width: 750px;
		margin: 1rem auto;
		background-color: var(--color-background);
		border: 1px solid var(--color-outline);
		border-radius: 1.5rem;

		// cancel peeping card view on smaller screens (rip)
		@media (max-width: 750px) {
			position: initial;
			margin: 0;
			background-color: transparent;
			border: none;
			border-bottom: 1px solid var(--color-outline);
			border-radius: 0;
			scale: 1 !important;
			filter: brightness(1) !important;
		}

		#profile {
			display: grid;
			border-radius: 99rem;
			padding: 0.25rem;
		}

		.side-button {
			display: flex;
			align-items: center;
			text-decoration: none;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
			padding-right: 1.25rem;
			color: var(--color-on-surface);
			position: absolute;
			border-radius: 99rem;
			border: 1px solid transparent;

			&:hover {
				// text-decoration: underline;
				background-color: var(--color-surface);
				border: 1px solid var(--color-outline);
			}
		}

		#back {
			left: 1rem;
			margin-left: -0.25rem;

			&:hover .arrow {
				transform: translateX(-0.25rem);
			}

			&:active .arrow {
				transform: translateX(0.125rem);
			}
		}

		#account {
			right: 1rem;
			margin-right: -0.25rem;
		}

		.arrow {
			display: grid;
			transition: transform 0.1s ease-in-out;
		}
	}
</style>
