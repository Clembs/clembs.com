<script lang="ts">
	import { page } from '$app/stores';
	import Clembs from '$lib/icons/Clembs.svelte';
</script>

<nav>
	<a href="/" id="profile">
		<Clembs />
	</a>
	<ul class="links">
		<a href="/" aria-current={$page.url.pathname === '/'}> Home </a>
		<a href="/projects" aria-current={$page.url.pathname === '/projects'}> Work </a>
		<a href="/comments" aria-current={$page.url.pathname.includes('/comments')}> Comments </a>
	</ul>
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		gap: 1rem;
		padding: 0.5rem 1rem;
		padding-top: 2rem;
		max-width: 1000px;
		margin: 0 auto;

		.links {
			display: flex;
			gap: 0.25rem;
			align-items: center;
			margin: 0;
			list-style: none;
			padding: 0;
			width: 100%;
			justify-content: end;

			a {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;
				padding: 0.5rem 1rem;
				border-radius: 99rem;
				text-decoration: none;
				border: 1px solid transparent;

				--transition-duration: 200ms;
				--transition: var(--transition-duration) cubic-bezier(0, 0, 0.125, 1);

				transition-delay: 0ms;
				transition:
					border var(--transition),
					padding var(--transition),
					transform var(--transition),
					font-variation-settings var(--transition);

				user-select: none;

				font-variation-settings: 'wght' 500;

				&:hover {
					border: 1px solid var(--color-outline);
					// padding: 0.5rem 1.25rem;
					font-variation-settings: 'wght' 550;
				}

				&[aria-current='true'] {
					background-color: var(--color-on-background);
					color: var(--color-background);
					// padding: 0.5rem 1.25rem;
					font-variation-settings: 'wght' 550;
				}
			}
		}

		// background-color: var(--color-background);
		// border-bottom: 1px solid var(--color-outline);

		#profile {
			display: flex;
			gap: 0.75rem;
			align-items: center;
			text-decoration: none;
			// border-radius: 0.5rem;
			// padding: 0.25rem 0.5rem;
		}
	}

	@media (max-width: 600px) {
		nav {
			flex-direction: column;

			ul {
				a {
					width: 100%;
				}
			}
		}
	}
</style>
