<script context="module" lang="ts">
	export type Breadcrumbs = {
		name: string;
		href: string;
	};
</script>

<script lang="ts">
	import { IconChevronRight } from '@tabler/icons-svelte';

	export let data: Breadcrumbs[];
</script>

<nav aria-label="Breadcrumbs">
	<ol>
		{#each data as { name, href }, i}
			<li>
				{#if i === data.length - 1}
					<span>{name}</span>
				{:else}
					<a {href}>{name}</a>
					<IconChevronRight />
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style lang="scss">
	ol {
		display: flex;
		// gap: 0.5rem;
		align-items: center;
		font-size: 0.875rem;
		padding: 0;
		margin: 0;
		margin-left: -0.75rem;
		user-select: none;
		position: relative;

		li {
			display: flex;
			align-items: center;
			// gap: 0.25rem;

			span,
			a {
				line-height: 1;
				padding: 0.5rem 0.75rem;
				border-radius: 99rem;
				top: -1px;
				left: 0px;
				position: relative;
				margin-right: -0.25rem;
			}

			a {
				text-decoration: none;

				&:hover {
					background-color: var(--color-surface);
					text-decoration: underline;
				}
			}
		}
	}
</style>
