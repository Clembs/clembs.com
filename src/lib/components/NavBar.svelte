<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const navLinks = [
		{
			href: '/',
			label: 'Home',
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
			href: '/comments',
			label: 'Comments (Alpha)',
		},
		{
			href: '/contact',
			label: 'Contact',
		},
	];

	let firstNavEl: HTMLAnchorElement;

	onMount(() => (firstNavEl = document.querySelector('a[href="/"]')!));
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
	<div class="links">
		{#each navLinks as link, i}
			<a
				href={link.href}
				aria-disabled={link.href === '/contact'}
				class="nav-item"
				class:selected={link.href === '/'
					? $page.url.pathname === '/'
					: $page.url.href.includes(link.href)}
				aria-label={link.label}
			>
				{link.label}
				<div class="background" />
			</a>
		{/each}
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		position: fixed;
		height: 58px;
		bottom: 0.75rem;
		max-width: 100%;
		border: 1px solid var(--color-on-background);
		background-color: var(--color-background);
		border-radius: 99rem;
		padding: 0.25rem;
		gap: 0.25rem;
		box-shadow: 0px 2px 0px 0px var(--color-on-background);
		transition: all linear 150ms;
		z-index: 9;
		overflow-y: scroll;

		.links {
			display: flex;
			gap: 0.25rem;
			height: 100%;
		}

		.nav-item {
			height: 100%;
			display: flex;
			position: relative;
			color: var(--color-on-background);
			padding: 0rem 0.75rem;
			border-radius: 99rem;
			text-decoration: none;
			font-weight: 400;
			font-variation-settings: 'wght' 400;
			align-items: center;
			white-space: nowrap;

			--transition-duration: 250ms;
			--transition: var(--transition-duration) cubic-bezier(0, 0, 0.125, 1);
			transition: all var(--transition);
			user-select: none;

			&[aria-disabled='true'] {
				pointer-events: none;
				text-decoration: line-through;
				text-decoration-color: red;
				color: var(--color-on-surface);
			}

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

			&.selected {
				fill: white;
				color: white;
				font-weight: 600;
				font-variation-settings: 'wght' 600;
				background: var(--color-on-background);
				padding: 0rem 1.25rem;
			}

			&:hover:not(.selected) {
				transition: all var(--transition);
				background: var(--color-surface);
			}
		}
	}

	@media (max-width: 768px) {
		nav {
			.nav-item {
				padding: 0 0.5rem;

				&.selected {
					padding: 0 0.825rem;
				}
			}
		}
	}
</style>
