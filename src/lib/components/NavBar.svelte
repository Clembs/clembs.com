<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';

	let expandItems = false;
	let showSettingsModal = false;

	const navLinks = [
		{
			href: '/projects',
			label: 'Work',
		},
		// {
		// 	href: '/comments',
		// 	label: $page.data.hasNameChange ? 'Clember' : 'Comments',
		// },
		{
			href: '/settings',
			label: $page.data.userData ? 'Account' : 'Login',
		},
		// {
		// 	href: '/contact',
		// 	label: 'Contact',
		// },
	];
</script>

<nav>
	<div class="nav-contents">
		<div class="main-elements">
			<a href="/" class="home">
				<Clembs />
			</a>

			<button
				on:click={() => {
					expandItems = !expandItems;
				}}
				class="menu-button nav-item"
				class:selected={expandItems}
			>
				{expandItems ? 'close' : 'menu'}
			</button>
		</div>

		<div class="links" class:expand={expandItems}>
			{#each navLinks as link, i}
				{#if link.href}
					<a
						on:click={() => {
							expandItems = false;
						}}
						href={link.href}
						aria-disabled={link.href === '/contact'}
						class="nav-item"
						aria-current={!showSettingsModal &&
							(link.href === '/' ? $page.url.pathname === '/' : $page.url.href.includes(link.href))}
						aria-label={link.label}
					>
						{link.label}
					</a>
				{:else}
					<button class="nav-item" aria-current={showSettingsModal} aria-label={link.label}>
						{link.label}
					</button>
				{/if}
			{/each}
		</div>
	</div>
</nav>

<style lang="scss">
	nav {
		position: sticky;
		inset: 0;
		z-index: 8;

		width: 100%;
		gap: 1rem;

		background-color: var(--color-background);
		border-bottom: 1px solid var(--color-outline);

		transition: background-color cubic-bezier(0.64, 0.005, 0.43, 1.01) 150ms;

		.nav-contents {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 1rem;
			max-width: 1000px;
			margin: 0 auto;
			z-index: 9;

			.main-elements {
				display: flex;
				justify-content: space-between;
				width: 100%;
				z-index: 11;

				.home {
					display: grid;
					place-items: center;
				}

				.menu-button {
					display: none;
					border: 1px solid var(--color-outline);
				}
			}

			.links {
				display: flex;
				gap: 0.25rem;
				align-items: center;
			}
			.nav-item {
				display: flex;
				position: relative;
				color: var(--color-on-background);
				padding: 0.5rem 1rem;
				border-radius: 99rem;
				text-decoration: none;
				font-weight: 400;
				font-variation-settings: 'wght' 400;
				align-items: center;
				white-space: nowrap;
				background-color: inherit;
				border: 1px solid transparent;

				--transition-duration: 250ms;
				--transition: var(--transition-duration) cubic-bezier(0, 0, 0.125, 1);
				transition: font-variation-settings var(--transition), border var(--transition);
				user-select: none;

				&[aria-disabled='true'] {
					pointer-events: none;
					text-decoration: line-through;
					text-decoration-color: red;
					color: var(--color-on-surface);
				}

				&[aria-current='true'] {
					fill: var(--color-background);
					color: var(--color-background);
					font-weight: 600;
					font-variation-settings: 'wght' 600;
					background: var(--color-on-background);
				}

				&:hover:not([aria-current='true']) {
					border: 1px solid var(--color-outline);
					transition: all var(--transition);
					font-variation-settings: 'wght' 500;
				}
			}
		}
	}

	@media (max-width: 768px) {
		nav .nav-contents {
			.main-elements {
				.menu-button {
					display: block;
				}
			}

			.links {
				background-color: var(--color-background);
				position: absolute;
				inset: 0;
				translate: 0 -100%;
				flex-direction: column;
				width: 100%;
				height: 100vh;
				height: 100dvh;
				padding: 1rem;
				justify-content: center;
				border-bottom: 1px solid var(--color-outline);
				transition: translate 300ms cubic-bezier(0.64, 0.005, 0.43, 1.01);

				.nav-item {
					width: 100%;
					// justify-content: center;
					font-size: 2rem;

					&.selected {
						background-color: var(--color-background);
						color: var(--color-on-background);
						&::before {
							content: '';
							height: 0.5rem;
							width: 0.5rem;
							background-color: var(--color-on-background);
							position: absolute;
							left: 0rem;
							border-radius: 50%;
						}
					}
				}

				&.expand {
					translate: 0;
				}
			}
		}
	}
</style>
