<script lang="ts">
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import IconArrowLeft from '@tabler/icons-svelte/dist/svelte/icons/IconArrowLeft.svelte';
</script>

<main>
	<header class:show-back-btn={!$page.url.href.endsWith('/comments')}>
		<a href="/comments" class="back-btn">
			<IconArrowLeft />
		</a>
		<h1>
			Comments
			<Badge style="outlined">Preview</Badge>
		</h1>
	</header>

	<slot />
</main>

<style lang="scss">
	header {
		--back-btn-size: 3rem;
		display: flex;
		text-decoration: none;
		align-items: center;
		gap: 0.5rem;
		margin: 1rem 0;
		margin-left: calc(-1 * var(--back-btn-size) + 0.5rem);
		transition: margin-left 150ms ease-in-out;

		&.show-back-btn {
			margin-left: 0;

			.back-btn {
				opacity: 1;
				pointer-events: all;
			}
		}

		.back-btn {
			width: var(--back-btn-size);
			height: var(--back-btn-size);
			display: grid;
			place-items: center;
			border-radius: 50%;
			opacity: 0;
			pointer-events: none;
			transition:
				opacity 150ms ease-in-out,
				background-color 150ms ease-in-out;

			&:hover {
				background-color: var(--color-surface);
			}
		}
		h1 {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}
	}
</style>
