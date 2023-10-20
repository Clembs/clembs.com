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
		<LoginForm>
			{#if skipToComment}
				<Button
					size="sm"
					style="text"
					on:click={() => {
						showModal = false;
						showCommentFormModal = true;
					}}
				>
					Write as Guest
				</Button>
			{/if}
		</LoginForm>
	</Modal>
{/if}
