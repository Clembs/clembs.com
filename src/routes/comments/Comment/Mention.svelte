<script lang="ts">
	export let node: { type: 'other'; text: string; icon: any; color: string };
	export let clickable = true;
</script>

{#if node.type === 'other'}
	<svelte:element
		this={clickable ? 'a' : 'div'}
		class="inline-mention {node.type}"
		style="background-color: {node.color}"
	>
		<svelte:component this={node.icon} />
		{node.text}
	</svelte:element>
{/if}

<style lang="scss">
	.inline-mention {
		display: inline-flex;
		padding: 0rem 0.25rem;
		align-items: center;
		gap: 0.25rem;
		vertical-align: top;
		top: 1px;
		position: relative;
		background-color: var(--background);
		border-radius: 2rem;
		color: var(--color-on-background);
		font-weight: 500;
		user-select: text;
		cursor: pointer;
		text-decoration: none;

		:global(svg) {
			width: 16px;
			height: 16px;
		}

		&::after {
			content: '';
		}

		&.user {
			--background: rgba(171, 205, 239, 0.4);
			--background-hover: rgba(171, 205, 239, 0.8);
		}

		&.project {
			--background: rgba(171, 239, 180, 0.4);
			--background-hover: rgba(171, 239, 180, 0.8);
		}

		&:hover {
			text-decoration: underline;
			background-color: var(--background-hover);
		}
	}
</style>
