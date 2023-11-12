<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { Comment as CommentType } from '$lib/db/types';
	import Comment from '../Comment/Comment.svelte';
	import CommentForm from './CommentForm.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';

	export let parentComment: CommentType | null = null;
	export let projectId: string | null = null;
	export let showModal = false;

	let showHelpModal = false;
	let content = '';
</script>

{#if showModal}
	<Modal
		on:close={(e) => {
			parentComment = null;
			content = '';
		}}
		bind:showModal
	>
		<header slot="title">
			<h1>
				{parentComment ? 'Reply' : 'Write a comment'}
			</h1>
		</header>

		{#if parentComment}
			<div class="parent-comment">
				<Comment initialNestingLevel={1} showActions={false} comment={parentComment} />
			</div>
		{/if}

		<div class="comment-profile">
			<GradientAvatar user={$page.data?.userData} size="2.25rem" />
			<div class="comment-profile-username">
				{$page.data?.userData?.username ?? 'Guest'} <span class="subtext">(You)</span>
			</div>
		</div>

		<CommentForm
			expanded
			bind:content
			bind:showHelpModal
			{projectId}
			bind:parentComment
			bind:showModal
		/>
	</Modal>
{/if}

<style lang="scss">
	header {
		margin-bottom: 1rem;
	}

	.parent-comment {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.comment-profile {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		margin-bottom: 0.5rem;

		&-username {
			font-weight: 500;
			font-size: 1.1rem;
		}
	}
</style>
