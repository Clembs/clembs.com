<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import CommentFormModal from '../../../routes/comments/CommentFormModal.svelte';
	import Button from '../Button.svelte';
	import Modal from '../Modal.svelte';
	import LoginForm from './LoginForm.svelte';

	export let showModal = false;
	export let skipToComment = false;
	export let parentComment: Comment | null = null;

	let showCommentFormModal = false;
</script>

{#if skipToComment}
	<CommentFormModal on:close bind:showModal={showCommentFormModal} {parentComment} />
{/if}

{#if showModal}
	<Modal bind:showModal>
		<h1 slot="title">Sign in to clembs.com</h1>

		<p>Like comments and get yours verified and personalized with a clembs.com account!</p>
		<p>Create an account or log back into it, no passwords required!</p>

		<LoginForm>
			{#if skipToComment}
				<Button
					style="text"
					inline={false}
					on:click={() => {
						showModal = false;
						showCommentFormModal = true;
					}}
				>
					Write anonymously
				</Button>
			{/if}
		</LoginForm>
	</Modal>
{/if}
