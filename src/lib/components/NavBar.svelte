<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';
	import { onMount } from 'svelte';

	const navLinks = [
		{
			href: '/',
		},
		{
			href: '/software',
			label: 'Software',
		},
		{
			href: '/branding',
			label: 'Design',
		},
		{
			href: '/contact',
			label: 'Contact',
		},
	];

	let firstNavEl: HTMLAnchorElement;
	let hideNavBar = false;

	const hide = () => (hideNavBar = (document.scrollingElement?.scrollTop ?? 0) > 5);

	onMount(hide);
</script>

<svelte:window
	on:scroll={hide}
	on:keydown={(ev) => {
		if (ev.altKey && ev.key === 'n') {
			ev.preventDefault();
			firstNavEl.focus();
		}
	}}
/>

<nav aria-hidden={hideNavBar}>
	{#each navLinks as link, i}
		{#if i === 0}
			<a
				bind:this={firstNavEl}
				href={link.href}
				class="nav-item"
				aria-label="Home"
				class:active={$page.url.pathname.endsWith(link.href)}
			>
				{#if link.label}
					{link.label}
				{:else}
					<Clembs />
				{/if}
			</a>
		{:else}
			<a href={link.href} class="nav-item" class:active={$page.url.pathname.includes(link.href)}>
				{#if link.label}
					{link.label}
				{:else}
					<Clembs />
				{/if}
			</a>
		{/if}
	{/each}
</nav>

<style lang="scss">
	nav {
		position: fixed;
		height: 58px;
		bottom: 1rem;
		border: 1px solid black;
		background-color: white;
		border-radius: 99rem;
		padding: 0.2rem;
		display: flex;
		align-items: center;
		gap: 0.2rem;
		box-shadow: 0px 2px 0px 0px black;
		transition: transform cubic-bezier(1, 0, 0, 1) 150ms;
		z-index: 9;

		&[aria-hidden='true']:not(:focus-within) {
			transition: transform cubic-bezier(1, 0, 0, 1) 150ms;
			transform: translateY(200%) scale(0.8);
		}

		.nav-item {
			display: flex;
			color: black;
			padding: 0.4rem 1rem;
			border-radius: 99rem;
			height: 100%;
			text-decoration: none;
			font-weight: 400;
			font-size: 1.1rem;
			align-items: center;
			// border: 1px solid white;
			transition: background-color ease-in 100ms, outline ease-in 100ms;
			background-color: white;

			&.active {
				fill: white;
				color: white;
				font-weight: 600;
				background: rgb(152, 118, 255);
				background: radial-gradient(
					circle at 100%,
					rgb(152, 118, 255) 0%,
					rgb(101, 79, 255) 40%,
					rgb(61, 132, 255) 70%,
					rgb(49, 192, 255) 100%
				);
			}

			&:hover {
				transition: background-color ease-out 100ms, outline ease-out 100ms;
				// border: 1px solid black;
				outline: 1px solid black;
				background-color: rgb(231, 231, 231);
			}
		}
	}
</style>
