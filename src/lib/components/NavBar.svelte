<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';
	import { IconArrowLeft, IconAt, IconBallpen, IconLogin } from '@tabler/icons-svelte';
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
		window.scrollTo({
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

	$: hideBackBtn = !$page.data.navButton && $page.url.pathname === '/';
</script>

<svelte:window on:scroll={scroll} />

<!-- TODO: make a mobile optimized navbar -->
<nav bind:this={navbarEl} style:scale={scaleFactor} style:filter="brightness({brightness})">
	<ul class="left" class:hideBackBtn>
		<li>
			<a
				href={$page.data.navButton?.href || '/'}
				id="back"
				inert={hideBackBtn}
				aria-hidden={hideBackBtn}
			>
				<div class="arrow">
					<IconArrowLeft size={28} />
				</div>
			</a>
		</li>
		<li>
			<a href="/">
				<Clembs />
			</a>
		</li>
	</ul>

	<ul class="right">
		{#if ['/comments', '/settings'].some((path) => $page.url.href.includes(path) || $page.data.userData)}
			<li>
				<a href="/settings" id="account" aria-current={$page.url.pathname === '/settings'}>
					{#if $page.data.userData}
						<GradientAvatar user={$page.data.userData} size="20px" />
						Account
					{:else}
						<div class="arrow">
							<IconLogin size={20} />
						</div>
						Sign in
					{/if}
				</a>
			</li>
		{/if}
		<li>
			<a href="/blog" aria-current={$page.url.pathname.includes('/blog')}>
				<IconBallpen size={20} />
				Blog
			</a>
		</li>
		<li>
			<a href="/contact" aria-current={$page.url.pathname === '/contact'}>
				<IconAt size={20} />
				Contact
			</a>
		</li>
		<!-- <li>
			<a href="/work">
				<IconLayoutCollage />
				Work
			</a>
		</li> -->
	</ul>
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.5rem;
		justify-content: space-between;
		overflow: hidden;

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

		#back {
			&:hover .arrow {
				transform: translateX(-0.1rem);
			}

			&:active:hover .arrow {
				transform: translateX(0.1rem);
			}
		}

		.arrow {
			display: grid;
			transition: transform 0.1s ease-in-out;
		}

		.left {
			display: flex;
			align-items: center;
			list-style: none;
			margin: 0;
			padding: 0;
			gap: 0.5rem;
			transition: transform 125ms ease;

			&.hideBackBtn {
				transform: translateX(calc(0px - (28px + 0.5rem * 2)));
			}

			li {
				display: contents;

				a {
					display: grid;
					border-radius: 99rem;
					text-decoration: none;
					padding: 0.5rem;
					color: var(--color-on-surface);
					border: 1px solid transparent;
					transition: background-color 50ms ease-out;

					&:hover {
						background-color: var(--color-surface);
					}
				}
			}
		}

		.right {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			list-style: none;
			margin: 0;
			padding: 0;

			li {
				display: contents;

				a {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 0.75rem;
					gap: 0.125rem;
					text-decoration: none;
					color: var(--color-on-surface);
					padding: 0.5rem 1rem;
					border-radius: 1rem;
					transition: background-color 0.1s ease-in-out;

					&:hover {
						background-color: var(--color-surface);
					}

					&[aria-current='true'] {
						background-color: var(--color-on-background);
						color: var(--color-background);
					}
				}
			}
		}
	}
</style>
