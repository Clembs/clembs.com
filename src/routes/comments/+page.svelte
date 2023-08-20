<script lang="ts">
	import Comment from './Comment.svelte';
	import type { Comment as CommentType } from './+page.server';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import CommentFormModal from './CommentFormModal.svelte';
	import type { PageData } from './$types';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import CreateCommentButton from './CreateCommentButton.svelte';

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

<CreateCommentButton userData={data.userData} on:click={() => (showModal = true)} />

<InfoBox type="note">
	<span slot="title">Welcome to the clembs.com comment section!</span>
	Here you can leave your feedback, ask me questions, speak between y'all, etc.<br />Basically, the
	only rule is don't be annoying (includes spam, racism, trolling, etc)!!!
</InfoBox>

<InfoBox type="danger">
	<span slot="title">Alpha warning</span>
	All of this is in very early development!! Let me know if anything goes wrong or you'd like to see
	any feature in particular ;)
</InfoBox>

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

<h2>Latest comments</h2>

<ul class="comments">
	{#each data.comments.reverse() as comment}
		<Comment {comment} on:reply={handleReplyButton} on:login={handleLoginRequiredButton} />
	{/each}
</ul>

<style lang="scss">
	.comments {
		list-style: none;
		padding: 0;
		margin: 0 -0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
