<script lang="ts">
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import type {
		ParserOutputProjectStructure,
		ParserOutputUserStructure,
	} from '$lib/helpers/parseMentions';
	import IconBrush from '@tabler/icons-svelte/dist/svelte/icons/IconBrush.svelte';
	import IconCode from '@tabler/icons-svelte/dist/svelte/icons/IconCode.svelte';

	export let node: Partial<ParserOutputProjectStructure> | ParserOutputUserStructure;
	export let clickable = true;
</script>

{#if node.type === 'user'}
	<svelte:element
		this={clickable ? 'a' : 'div'}
		href="/users/{node.username}"
		class="inline-mention {node.type}"
	>
		<GradientAvatar
			showSilhouette={false}
			user={{ username: node.username }}
			size="16px"
			showBadge={false}
		/>
		{node.username}
	</svelte:element>
{:else}
	<svelte:element
		this={clickable ? 'a' : 'div'}
		target="_blank"
		class="inline-mention {node.type}"
		href="/{node.projectType}/{node.projectId}"
	>
		{#if node.projectType === 'branding'}
			<IconBrush size={16} />
		{:else}
			<IconCode size={16} />
		{/if}
		{node.projectId}
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
