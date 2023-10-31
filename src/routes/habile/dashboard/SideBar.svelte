<script lang="ts">
	import { page } from '$app/stores';
	import IconHome from '@tabler/icons-svelte/dist/svelte/icons/IconHome.svelte';
	import IconShoppingBag from '@tabler/icons-svelte/dist/svelte/icons/IconShoppingBag.svelte';
	import IconReceipt from '@tabler/icons-svelte/dist/svelte/icons/IconReceipt.svelte';
	import IconSettings from '@tabler/icons-svelte/dist/svelte/icons/IconSettings.svelte';

	const menus = [
		{
			label: 'Home',
			icon: IconHome,
			href: '/habile/dashboard',
		},
		{
			label: 'Store',
			icon: IconShoppingBag,
			href: '/habile/dashboard/store',
		},
		{
			label: 'Purchase history',
			icon: IconReceipt,
			href: '/habile/dashboard/billing',
		},
		{
			label: 'Settings',
			icon: IconSettings,
			href: '/habile/dashboard/settings',
		},
	];
</script>

<aside>
	<div class="header">
		<div class="logo">Habile Chat</div>

		<a href="/habile/dashboard/settings" class="account">
			{#if $page.data?.discordData}
				<img
					src="https://cdn.discordapp.com/avatars/{$page.data.discordData.id}/{$page.data
						.discordData.avatar}.png"
					alt={$page.data.discordData.username}
					height="24"
					width="24"
				/>
				<span>
					<span class="linked-to">Linked to </span>
					<span class="discord-username">
						@{$page.data.discordData.username}
					</span>
				</span>
			{:else}
				Link your Discord account
			{/if}
		</a>
	</div>
	<ul>
		{#each menus as menu}
			<li>
				<a aria-current={$page.url.pathname === menu.href} href={menu.href}>
					<svelte:component this={menu.icon} />

					<div class="label">
						{menu.label}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</aside>

<style lang="scss">
	aside {
		border-right: 1px solid var(--color-outline);
		padding: 0 0.5rem;
		z-index: 7;

		.header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin-bottom: 1rem;

			.logo {
				padding: 1.25rem;
				font-weight: 500;
				font-size: 2rem;
				text-align: center;
			}

			.account {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				margin-top: -1rem;
				border-radius: 99rem;
				padding: 0.25rem;
				padding-right: 0.5rem;
				text-decoration: none;
				border: 1px solid transparent;

				img {
					border-radius: 99rem;
				}

				&:hover {
					border: 1px solid var(--color-outline);
					background-color: var(--color-surface);
				}
			}
		}

		ul {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 0;
			margin: 0;
			list-style: none;

			li {
				margin: 0;
				a {
					display: flex;
					align-items: center;
					text-decoration: none;
					padding: 0.615rem 1.25rem;
					gap: 0.615rem;
					border-radius: 99rem;
					border: 1px solid transparent;
					color: var(--color-on-background);
					background-color: var(--color-background);
					transition: border 100ms ease-in-out;

					:global(svg) {
						height: 24px;
						width: 24px;
					}

					&:hover:not([aria-current='true']) {
						border: 1px solid var(--color-outline);
					}

					&[aria-current='true'] {
						background-color: var(--color-on-background);
						color: var(--color-background);
						font-weight: 600;
					}
				}
			}
		}
	}

	@media (max-width: 1000px) {
		aside {
			.header {
				.logo {
					font-size: 1.5rem;
				}
				.account {
					.linked-to {
						display: none;
					}
				}
			}
			ul {
				align-items: center;
				li {
					width: min-content;
					a {
						.label {
							display: none;
						}
					}
				}
			}
		}
	}

	@media (max-width: 600px) {
		aside {
			position: sticky;
			top: 0;
			left: 0;
			background-color: var(--color-background);
			border-right: none;
			border-bottom: 1px solid var(--color-outline);
			padding-bottom: 0.5rem;

			.header {
				flex-direction: row;
				justify-content: space-between;
				margin-bottom: 0;
				.account {
					margin-top: 0;
				}
			}

			ul {
				width: 100%;

				flex-direction: row;
				justify-content: space-between;
				font-size: 0.875rem;
				text-align: center;
				overflow: scroll;
				li {
					width: 100%;
					a {
						align-items: center;
						border-radius: 0.5rem;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
