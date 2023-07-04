<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';

	const navLinks = [
		{
			href: '/',
		},
		{
			href: '/branding',
			label: 'Design',
		},
		{
			href: '/software',
			label: 'Software',
		},
		{
			href: '/contact',
			label: 'Contact',
		},
	];

	let firstNavEl: HTMLAnchorElement;
</script>

<svelte:window
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
				class:active={$page.url.pathname === '/'}
			>
				<Clembs />
				<div class="background" />
			</a>
		{:else}
			<a href={link.href} class="nav-item" class:active={$page.url.href.includes(link.href)}>
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
			transition: font-variation-settings var(--transition);

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
