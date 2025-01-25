<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<table>
	{@render children?.()}
</table>

<style lang="scss">
	:global(table) {
		text-align: left;
		padding: 0;
		width: 100%;
		border-spacing: 0;
		border-collapse: separate;
		text-decoration: inherit;
		margin-top: 0;
		border: 1px solid var(--color-outline);
		overflow: scroll;
		border-radius: 0.5rem;
		background-color: var(--color-background);

		:global(tr) {
			text-decoration: inherit;
			border-radius: 0.75rem;

			:global(td),
			:global(th) {
				padding: 0.75rem 1rem;
			}

			&:not(:last-child) {
				:global(td),
				:global(th) {
					border-bottom: 1px solid var(--color-outline);
				}
			}

			:global(th) {
				text-align: left;
				font-weight: 600;
				padding-bottom: 0.75rem;
				background-color: var(--color-surface);
			}
		}
	}
</style>
