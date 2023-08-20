<script lang="ts">
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import Comment from '../Comment.svelte';
	import CommentForm from '../CommentForm.svelte';
	import CommentFormModal from '../CommentFormModal.svelte';
	import ExpandedComment from '../ExpandedComment.svelte';
	import type { PageData } from './$types';
	import type { Comment as CommentType } from '../+page.server';
	import CreateCommentButton from '../CreateCommentButton.svelte';

	export let data: PageData;
	let showModal = false;
	let skipToComment = true;

	let selectedParentComment: CommentType | null = null;

	function handleReplyButton(event: { detail: CommentType | null }) {
		selectedParentComment = event.detail;
		skipToComment = true;
		showModal = true;
	}

	function handleLoginRequiredButton() {
		skipToComment = false;
		showModal = true;
	}
</script>

{#if !data.userData}
	<LoginModal
		{skipToComment}
		parentComment={selectedParentComment}
		on:close={() => {
			selectedParentComment = null;
		}}
		bind:showModal
	/>
{:else}
	<CommentFormModal
		bind:showModal
		parentComment={selectedParentComment}
		on:close={() => {
			selectedParentComment = null;
		}}
	/>
{/if}

<ExpandedComment
	comment={data.comment}
	on:reply={handleReplyButton}
	on:login={handleLoginRequiredButton}
/>

<h3>Replies ({data.comment.childComments.length})</h3>

<CreateCommentButton
	userData={data.userData}
	on:click={() =>
		handleReplyButton({
			detail: data.comment,
		})}
	reply={true}
/>

{#if data.comment.childComments.length}
	{#each data.comment.childComments as comment}
		<Comment {data} {comment} on:reply={handleReplyButton} on:login={handleLoginRequiredButton} />
	{/each}
{/if}
