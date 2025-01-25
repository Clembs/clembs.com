<script module lang="ts">
	export type Breadcrumbs = {
		name: string;
		href: string;
	};
</script>

<script lang="ts">
	import { IconChevronRight } from '@tabler/icons-svelte';

	interface Props {
		data: Breadcrumbs[];
	}

	let { data }: Props = $props();
</script>

<nav aria-label="Breadcrumbs">
	<ol>
		{#each data as { name, href }, i}
			<li>
				{#if i === data.length - 1}
					<span>{name}</span>
				{:else}
					<a {href}>{name}</a>
				{/if}
			</li>
			{#if i !== data.length - 1}
				<IconChevronRight />
			{/if}
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
		margin: 1rem 0;
		margin-left: -0.75rem;
		user-select: none;
		position: relative;

		li {
			display: flex;
			align-items: center;
			margin: 0;

			span,
			a {
				line-height: 1;
				padding: 0.5rem 0.75rem;
				border-radius: 99rem;
				top: -1px;
				left: 0px;
				position: relative;
				margin-right: -0.25rem;
				font-weight: 500;
			}

			span {
				color: var(--color-on-surface);
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
