<script lang="ts">
	import { enhance } from '$app/forms';
	import { EMAIL_REGEX } from '$lib/helpers/email';
	import { LoaderIcon } from 'svelte-french-toast';
	import type { Comment } from '$lib/db/types';
	import CommentFormModal from '../../routes/comments/CommentFormModal.svelte';
	import Button from './Button.svelte';
	import InfoBox from './InfoBox.svelte';
	import Modal from './Modal.svelte';
	import TextInput from './TextInput.svelte';

	export let showModal = false;
	export let email = '';
	export let skipToComment = false;
	export let parentComment: Comment | null = null;
	let error = '';
	let success: boolean;
	let loading = false;

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

		<form
			action="/account?/login"
			use:enhance={() => {
				loading = true;

				return async ({ result, update }) => {
					loading = false;

					if (result.type === 'failure') {
						error = result.data?.message;
					}
					if (result.type === 'error') {
						error = result.error?.message;
					}
					if (result.type === 'success') {
						success = true;
						error = '';
					}

					update({
						reset: false,
					});
				};
			}}
			method="post"
		>
			<TextInput
				bind:value={email}
				name="email"
				label="Email"
				type="email"
				placeholder="example@clembs.com"
				required={true}
			/>

			<div class="actions">
				{#if error}
					<InfoBox type="danger">
						<div slot="title">An error occured.</div>
						{error}
					</InfoBox>
				{/if}

				<Button type="submit" disabled={success || !EMAIL_REGEX.test(email)} inline={false}>
					{#if loading}
						<LoaderIcon />
					{:else}
						{success ? 'Check your inbox!' : 'Send email link'}
					{/if}
				</Button>
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
			</div>
		</form>
	</Modal>
{/if}

<style lang="scss">
	.actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}
</style>
