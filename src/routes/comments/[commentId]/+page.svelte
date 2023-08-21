<script lang="ts">
	import ExpandedComment from '../ExpandedComment.svelte';
	import type { PageData } from './$types';
	import type { Comment as CommentType } from '$lib/db/types';
	import Comments from '../Comments.svelte';

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

<ExpandedComment
	comment={data.comment}
	on:reply={handleReplyButton}
	on:login={handleLoginRequiredButton}
/>

<Comments
	bind:showModal
	userData={data?.userData}
	comments={data.comment.childComments}
	parentComment={data.comment}
/>
