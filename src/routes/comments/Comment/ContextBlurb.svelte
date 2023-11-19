<script lang="ts">
	import { designPosts } from '$lib/data/design';
	import { softwareData } from '$lib/data/software';
	import type { Comment } from '$lib/db/types';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconBrush from '@tabler/icons-svelte/dist/svelte/icons/IconBrush.svelte';
	import IconCode from '@tabler/icons-svelte/dist/svelte/icons/IconCode.svelte';
	import Curve from '$lib/components/Curve.svelte';

	export let comment: Comment;
</script>

{#if comment.parentComment}
	<a href="/comments/{comment.parentComment.id}" class="context-blurb subtext">
		<Curve />
		<div>
			<IconMessageCircle />
			<span>
				Replying to
				{comment.parentComment.author
					? `@${comment.parentComment.author.username}`
					: 'a guest'}'{comment.parentComment.author?.username?.endsWith('s') ? '' : 's'} comment
			</span>
		</div>
	</a>
{:else if comment.projectId}
	{@const [projectType, projectId] = comment.projectId.split('/')}
	{@const project =
		projectType === 'branding'
			? designPosts.find(({ id }) => id === projectId)
			: softwareData.find(({ id }) => id === projectId)}
	{#if project}
		<a href="/{projectType}/{projectId}" class="context-blurb subtext">
			<Curve />
			<div>
				{#if projectType === 'branding'}
					<IconBrush />
				{:else}
					<IconCode />
				{/if}
				Comment from "{'name' in project ? project.name : project.title}"
			</div>
		</a>
	{/if}
{/if}

<style lang="scss">
	.context-blurb {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-on-surface);
		text-decoration: none;
		margin-left: 1rem;
		font-weight: 400;
		font-style: italic;

		div {
			display: flex;
			align-items: center;
			gap: 0.25rem;
			margin-top: -1rem;
		}

		&:hover {
			text-decoration: underline;
		}

		:global(svg) {
			height: 18px;
			width: 18px;
		}
	}
</style>
