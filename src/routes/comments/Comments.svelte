<script lang="ts">
	import type { LegacyComment as CommentType } from '$lib/db/types';
	import HabileNeutral from '$lib/icons/habile/HabileNeutral.svelte';
	import HabileHappy from '$lib/icons/habile/HabileHappy.svelte';
	import Comment from './Comment/Comment.svelte';

	interface Props {
		comments: CommentType[];
	}

	let { comments }: Props = $props();
</script>

<div class="comments-page" id="comments">
	<div class="header">
		<div class="title">
			<h3>Comments</h3>
	
			<div class="title-text">
				<span class="subtext">
					{comments.length}
					{comments.length === 1 ? 'comment' : 'comments'}
				</span>
			</div>
		</div>
	</div>

	{#if comments.length}
	<ul>
		{#each comments as comment (comment.id)}
			<Comment {comment} />
		{/each}
	</ul>

		<li class="no-comments">
			<HabileHappy />
			You've reached the end of the comments!
		</li>
	{:else}
		<div class="no-comments">
			<HabileNeutral />
				No comments yet...
		</div>
	{/if}
</div>

<style lang="scss">
	.comments-page {
		margin: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.25rem;

			h3 {
				font-size: 1.5rem;
			}
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.no-comments {
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0.5;
		gap: 0.5rem;
		color: var(--color-on-surface);
		font-size: 1.1rem;
		width: 100%;
		text-align: center;
		padding: 2rem;
		user-select: none;

		:global(svg) {
			width: 64px;
			height: 64px;
		}
	}
</style>
