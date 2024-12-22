<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import { page } from '$app/stores';
	import { LoaderIcon } from 'svelte-french-toast';
	import VoteButtons from './VoteButtons.svelte';
	import { enhance } from '$app/forms';
	import '../../../styles/comment.scss';
	import ActionButton from './ActionButton.svelte';
	import CommentContent from './CommentContent.svelte';
	import {
		IconTrash,
		IconHeartFilled,
		IconHeart,
		IconMessageCircle,
		IconX,
	} from '@tabler/icons-svelte';
	import CommentHeader from './CommentHeader.svelte';
	import CommentList from './CommentList.svelte';
	import CommentForm from '../CommentForm/CommentForm.svelte';
	import { slide } from 'svelte/transition';
	import { invalidate } from '$app/navigation';

	export let comment: Comment;

	let isDeletionLoading = false;
	let isPinningLoading = false;

	export let areRepliesShown = true;

	let showReplyForm = false;
</script>

<article
	class="comment-wrapper {!!comment.parentId ? 'reply' : 'parent'}"
	data-comment-id={comment.id}
>
	<div class="comment">
		<CommentHeader {comment} />

		<CommentContent {comment} dynamicContent={!comment.projectId} />

		<div class="comment-actions">
			<VoteButtons {comment} />
			<ActionButton on:click={() => (showReplyForm = !showReplyForm)} aria-label="Reply to comment">
				{#if showReplyForm}
					<IconX />
					Cancel
				{:else}
					<IconMessageCircle />
					Reply
				{/if}
			</ActionButton>
			{#if !comment.parentId && $page.data.userData?.badges?.includes('CLEMBS')}
				<form
					use:enhance={() => {
						isPinningLoading = true;
						return ({ update }) => {
							isPinningLoading = false;
							update();
						};
					}}
					action="/comments/{comment.id}?/pin"
					method="POST"
				>
					<ActionButton aria-label="Feature comment">
						{#if isPinningLoading}
							<LoaderIcon />
						{:else if comment.isPinned}
							<IconHeartFilled />
						{:else}
							<IconHeart />
						{/if}
					</ActionButton>
				</form>
			{/if}
			{#if ($page.data.userData && $page.data.userData?.id === comment.author?.id) || $page.data.userData?.badges?.includes('CLEMBS')}
				<form
					use:enhance={() => {
						isDeletionLoading = true;
						return async ({ update }) => {
							await update();
							await invalidate('comments');
							isDeletionLoading = false;
						};
					}}
					method="POST"
					action="/comments/{comment.id}?/delete"
				>
					<ActionButton aria-label="Delete comment">
						{#if isDeletionLoading}
							<LoaderIcon />
						{:else}
							<IconTrash />
						{/if}
					</ActionButton>
				</form>
			{/if}
		</div>
	</div>

	<div class="child-comments">
		{#if showReplyForm}
			<div class="reply-form" transition:slide>
				<CommentForm expanded projectId={comment.projectId} parentComment={comment} />
			</div>
		{/if}
		{#if comment.childComments?.length && areRepliesShown}
			<CommentList comments={comment.childComments} />
		{/if}
	</div>
</article>

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		position: relative;

		&.parent {
			overflow-x: scroll;
			margin: 0 -1rem;

			.comment {
				padding: 0.5rem 1rem;
			}

			.child-comments {
				padding-right: 1rem;
			}
		}

		&.reply {
			padding-left: 1rem;
			border-left: 1px solid var(--color-outline);
		}
	}

	.comment {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		position: relative;
		padding: 0.5rem 0;
		z-index: 2;

		font-weight: inherit;
		text-decoration: none;

		.comment-actions {
			display: flex;
			gap: 0.25rem;
			margin-left: 2.25rem;
		}
	}

	.child-comments {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: 3.25rem;
		padding-top: 0.5rem;
	}
</style>
