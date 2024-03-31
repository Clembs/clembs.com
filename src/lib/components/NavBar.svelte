<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';
	import { IconArrowLeft, IconLogin } from '@tabler/icons-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import GradientAvatar from './GradientAvatar/GradientAvatar.svelte';
</script>

<nav>
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
		position: relative;
		width: 100%;
		padding: 1rem;
		margin-bottom: 1rem;

		// position: sticky;
		// inset: 0;
		// background-color: var(--color-background);
		// z-index: 99;
		border-bottom: 1px solid var(--color-outline);

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
