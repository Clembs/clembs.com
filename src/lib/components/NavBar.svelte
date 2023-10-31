<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';
	import IconAt from '@tabler/icons-svelte/dist/svelte/icons/IconAt.svelte';
	import IconStack2 from '@tabler/icons-svelte/dist/svelte/icons/IconStack2.svelte';
	import IconUser from '@tabler/icons-svelte/dist/svelte/icons/IconUser.svelte';
	import GradientAvatar from './GradientAvatar/GradientAvatar.svelte';

	let showSettingsModal = false;

	const navLinks = [
		{
			href: '/',
			icon: Clembs,
			label: 'Home',
		},
		{
			href: '/contact',
			icon: IconAt,
			label: 'Contact',
		},
		{
			icon: IconStack2,
			label: 'Work',
			categories: [
				{
					label: 'Projects',
					items: [
						{
							label: 'Design',
							description: 'UI, UX, logo design and case studies.',
							img: 'https://m.clembs.com/placeholder-image.png',
							href: '/design',
						},
						{
							label: 'Software',
							description: 'Apps, tools, bots and the like.',
							img: 'https://m.clembs.com/placeholder-image.png',
							href: '/software',
						},
					],
				},
				{
					label: 'Apps',
					items: [
						{
							label: 'Comments',
							description: 'Community-driven feed of clembs.com.',
							img: 'https://m.clembs.com/placeholder-image.png',
							href: '/comments',
						},
						{
							label: 'Habile Chat',
							description: 'Your cute, smart and friendly Discord chatbot.',
							img: 'https://m.clembs.com/placeholder-image.png',
							href: '/habile/dashboard',
						},
					],
				},
			],
		},
		// {
		// 	href: '/comments',
		// 	label: $page.data.hasNameChange ? 'Clember' : 'Comments',
		// },
		{
			href: '/settings',
			icon: IconUser,
			label: 'Account',
		},
	];
</script>

<nav>
	<div class="nav-contents">
		<a href="/" class="home">
			<Clembs />
		</a>

		<ul class="links">
			<input id="work" type="checkbox" aria-hidden={true} tabindex={-1} />
			{#each navLinks as link}
				{#if link.href && ($page.data.userData || link.href !== '/settings')}
					<!-- aria-current={!showSettingsModal &&
							(linkg.href === '/' ? $page.url.pathname === '/' : $page.url.href.includes(link.href))} -->
					<a
						href={link.href}
						class="nav-item"
						class:clembs={link.href === '/'}
						aria-label={link.label}
					>
						<div class="icon">
							{#if link.href === '/settings'}
								<GradientAvatar user={$page.data.userData} showBadge={false} size="24px" />
							{:else}
								<svelte:component this={link.icon} />
							{/if}
						</div>
						<div class="label">
							{link.label}
						</div>
					</a>
				{:else if link.categories}
					<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
					<label for="work" class="nav-item" role="button" aria-label={link.label} tabindex={0}>
						<div class="icon">
							<svelte:component this={link.icon} />
						</div>
						<div class="label">
							{link.label}
						</div>
						<!-- svelte-ignore a11y-autofocus -->
						<ul
							class="dropdown-menu"
							autofocus={true}
							role="menu"
							aria-label="{link.label} dropdown menu"
							aria-hidden={true}
						>
							{#each link.categories as category}
								<li class="category">
									<div class="category-label">
										{category.label}
									</div>

									<ul class="categories">
										{#each category.items as catItem}
											<li class="item">
												<a href={catItem.href}>
													<img
														class="item-icon"
														src={catItem.img}
														alt={catItem.label}
														height={32}
														width={32}
													/>
													<div class="item-right">
														<div class="item-label">
															{catItem.label}
														</div>
														<div class="item-description">
															{catItem.description}
														</div>
													</div>
												</a>
											</li>
										{/each}
									</ul>
								</li>
							{/each}
						</ul>
					</label>
				{/if}
			{/each}
		</ul>
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

		.nav-contents {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem 1rem;
			max-width: 1000px;
			margin: 0 auto;
			z-index: 9;

			.home {
				display: grid;
				place-items: center;
			}

			.links {
				display: flex;
				gap: 0.25rem;
				align-items: center;
				margin: 0;
				list-style: none;
				padding: 0;
			}

			.nav-item {
				display: flex;
				position: relative;
				color: var(--color-on-background);
				gap: 0.5rem;
				padding: 0.5rem 1rem;
				border-radius: 99rem;
				text-decoration: none;
				cursor: pointer;
				border: 1px solid transparent;

				--transition-duration: 500ms;
				--transition: var(--transition-duration) cubic-bezier(0, 0, 0.125, 1);

				transition-delay: 0ms;
				transition: border var(--transition);

				user-select: none;

				.icon {
					display: grid;
					place-items: center;
				}

				.label {
					transition: font-variation-settings var(--transition);
					font-variation-settings: 'wght' 400;
				}

				&:hover {
					border: 1px solid var(--color-outline);
					// transition: all var(--transition);
					.label {
						font-variation-settings: 'wght' 500;
					}
				}

				:global(svg) {
					height: 24px;
					width: 24px;
				}

				&.clembs {
					display: none;
				}

				.dropdown-menu {
					display: flex;
					flex-direction: column;
					background-color: var(--color-background);
					color: var(--color-on-background);
					border-radius: 0.75rem;
					padding: 0.25rem;
					width: 350px;
					border: 1px solid var(--color-outline);
					position: absolute;
					top: 90%;
					right: 0;
					transition: opacity 300ms cubic-bezier(0.64, 0.005, 0.43, 1.01),
						top 300ms cubic-bezier(0.64, 0.005, 0.43, 1.01);
					opacity: 0;
					pointer-events: none;
					font-variation-settings: initial;

					ul,
					li {
						margin: 0;
						padding: 0;
						list-style: none;
					}

					.category {
						&-label {
							font-weight: 500;
							margin-bottom: 0.5rem;
							font-size: 0.8rem;
							text-transform: uppercase;
							padding: 0.5rem;
							padding-bottom: 0;
						}
					}

					.item a {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						text-decoration: none;
						font-weight: 400;
						padding: 0.5rem;
						border-radius: 0.5rem;

						&:hover {
							background-color: var(--color-surface);
						}

						.item-icon {
							border-radius: 0.5rem;
							border: 1px solid var(--color-outline);
						}

						.item-label {
							font-weight: 500;
							font-size: 1.1rem;
						}

						.item-description {
							font-size: 0.8rem;
							color: var(--color-on-surface);
						}
					}
				}
			}
		}

		input[type='checkbox'] {
			display: none;

			&:checked ~ label {
				fill: var(--color-background);
				background: var(--color-on-background);
				color: var(--color-background);
				font-weight: 600;
				.label {
					font-variation-settings: 'wght' 600;
				}

				&:hover .label {
					font-variation-settings: 'wght' 600;
				}

				.dropdown-menu {
					top: 105%;
					opacity: 1;
					pointer-events: all;
				}
			}
		}
	}

	@media (max-width: 600px) {
		nav {
			position: fixed;
			inset: auto;
			bottom: 0;
			border-top: 1px solid var(--color-outline);
			border-bottom: none;

			.nav-contents {
				padding: 0.25rem;

				.home {
					display: none;
				}
			}

			.links {
				width: 100%;
				justify-content: space-evenly;
				.nav-item {
					flex-direction: column;
					align-items: center;
					gap: 0.25rem !important;
					width: 100%;
					border-radius: 0.75rem;

					.label {
						font-size: 0.9rem;
					}

					&.clembs {
						display: flex;
					}

					.dropdown-menu {
						position: fixed;
						top: auto;
						left: 0;
						bottom: 50px;
						opacity: 0;
						height: max-content;
						width: 100%;
						transition: opacity 150ms cubic-bezier(0.64, 0.005, 0.43, 1.01),
							bottom 150ms cubic-bezier(0.64, 0.005, 0.43, 1.01);
						z-index: -1;
						border-radius: 2rem 2rem 0 0;
						border: none;
						border-top: 1px solid var(--color-outline);
						padding-top: 1rem;

						.category-label {
							font-size: 0.9rem;
							padding: 0.5rem;
						}
					}
				}
			}

			input[type='checkbox']:checked ~ label {
				.dropdown-menu {
					bottom: 76px;
					pointer-events: all;
					top: auto;
					opacity: 1;
				}
			}
		}
	}
</style>
