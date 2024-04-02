<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';
	import toast, { LoaderIcon } from 'svelte-french-toast';
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

	// export let areRepliesLoaded = true;
	export let areRepliesShown = true;

	let showReplyForm = false;

	// async function loadChildComments() {
	// 	if (!comment.childComments?.length) {
	// 		areRepliesLoading = true;
	// 		try {
	// 			const req = await fetch(`/comments/api/${comment.id}/comments`);

	// 			areRepliesLoaded = true;
	// 			comment.childComments = await req.json();
	// 		} catch (e) {
	// 			toast.error('Failed loading replies.');
	// 		}
	// 		areRepliesLoading = false;
	// 	}
	// }
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
			<!-- {#if areRepliesShown} -->
			<CommentList comments={comment.childComments} />
			<!-- {:else}
				<button
					class="view-replies-button"
					on:mouseover={loadChildComments}
					on:focus={loadChildComments}
					on:click|preventDefault={() => {
						if (!areRepliesLoading) {
							areRepliesShown = true;
						}
					}}
				>
					{#if areRepliesLoading}
						<LoaderIcon />
					{:else}
						<div class="profiles">
							{#each comment.childComments.slice(0, 3) as childComment}
								<GradientAvatar user={childComment.author} size="1rem" />
							{/each}
						</div>
						View {comment.childComments.length} replies
					{/if}
				</button>
			{/if} -->
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
		padding-left: 2.75rem;
		padding-top: 0.5rem;
	}

	// .view-replies-button {
	// 	z-index: 1;
	// 	transform: translateY(-0.5rem);
	// 	display: flex;
	// 	align-items: center;
	// 	cursor: pointer;
	// 	gap: 0.5rem;
	// 	font-size: 0.8rem;
	// 	font-weight: 500;
	// 	margin: 0 -0.25rem;
	// 	padding: 0.5rem 0.75rem;
	// 	text-decoration: none;
	// 	border-radius: 1rem;
	// 	width: fit-content;

	// 	transition:
	// 		box-shadow 150ms ease-in-out,
	// 		transform 150ms ease-in-out;

	// 	&:hover {
	// 		background-color: var(--color-surface);
	// 	}

	// 	.profiles {
	// 		display: flex;

	// 		:global(.avatar) {
	// 			margin-left: -0.25rem;
	// 		}
	// 	}
	// }
</style>
