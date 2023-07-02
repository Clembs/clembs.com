<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';

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
	let scrollingOnNavBarEl: '/#design' | '/#software' | '/' = '/';
	let designHomeSection: HTMLElement;

	function detectHomeSection() {
		if ($page.url.pathname !== '/') return;
		designHomeSection ??= document.querySelector('section#design')!;
		const position = designHomeSection?.getBoundingClientRect();

		scrollingOnNavBarEl =
			window.scrollY > document.body.clientHeight + position.top - 100 &&
			window.scrollY < document.body.clientHeight + position.bottom + 100
				? '/#design'
				: '/';
	}
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
				{#if link.label}
					{link.label}
				{:else}
					<Clembs />
				{/if}
			</a>
		{:else}
			<a
				href={link.href}
				class="nav-item"
				class:active={scrollingOnNavBarEl === link.href ||
					(link?.path ? $page.url.href.includes(link.path) : false)}
			>
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
		border: 1px solid var(--color-on-background);
		background-color: var(--color-background);
		border-radius: 99rem;
		padding: 0.2rem;
		display: flex;
		align-items: center;
		gap: 0.2rem;
		min-width: max-content;
		box-shadow: 0px 2px 0px 0px var(--color-on-background);
		transition: all cubic-bezier(1, 0, 0, 1) 150ms;
		z-index: 9;

		.nav-item {
			display: flex;
			color: var(--color-on-background);
			padding: 0rem 1rem;
			border-radius: 99rem;
			height: 100%;
			text-decoration: none;
			font-weight: 400;
			font-size: 1.1rem;
			align-items: center;
			// border: 1px solid white;
			transition: all ease-in 100ms;
			background-color: var(--color-background);

			&.active {
				fill: white;
				color: white;
				font-weight: 600;
				background: var(--main-gradient);
				padding: 0rem 1.5rem;
			}

			&:hover {
				transition: all ease-out 100ms;
				outline: 1px solid var(--color-on-background);
				background-color: var(--color-surface);
			}
		}
	}
</style>
