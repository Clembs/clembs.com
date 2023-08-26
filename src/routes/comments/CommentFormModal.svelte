<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { Comment as CommentType } from '$lib/db/types';
	import Comment from './Comment.svelte';
	import Curve from '$lib/components/Curve.svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import IconAlertCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertCircleFilled.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import InfoBox from '$lib/components/InfoBox.svelte';

	export let parentComment: CommentType | null = null;
	export let projectId: string | null = null;
	export let showModal = false;

	let error = '';
	let content = '';
	let loading = false;

	const commentMaxLength = 256;

	onMount(() => document.querySelector('textarea')?.focus());
</script>

<svelte:window
	on:beforeunload={(e) => {
		if (content) {
			e.preventDefault();
			e.returnValue = '';
		}
	}}
/>

{#if showModal}
	<Modal on:close={(e) => (content = '')} bind:showModal>
		<h1 slot="title">
			{parentComment
				? $page.data.hasNameChange
					? 'Clemb a reply'
					: `Reply to ${parentComment.author?.username ?? 'comment'}`
				: $page.data.hasNameChange
				? 'Write a clemb'
				: 'Write a comment'}
		</h1>
		{#if parentComment}
			<div class="parent-comment">
				<div aria-hidden="false" class="branch">
					<Curve />
					<div class="line" />
				</div>
				<Comment showActions={false} comment={parentComment} />
			</div>
		{/if}

		<form
			action="/comments?/post"
			method="POST"
			use:enhance={async () => {
				loading = true;

				await new Promise((resolve) => setTimeout(resolve, 500));

				return ({ result, update }) => {
					loading = false;

					if (result.type === 'success') {
						showModal = false;
						toast.success(
							$page.data.hasNameChange ? 'you clembed. well clembed!' : 'Comment sent!'
						);
					}
					if (result.type === 'failure') {
						error = result.data?.message;
					}
					if (result.type === 'error') {
						error = result.error?.message;
						return;
					}
					if ('message' in result) {
						error = String(result.message);
					}

					update();
				};
			}}
		>
			{#if parentComment}
				<input type="hidden" name="parent-comment" value={parentComment.id} />
			{/if}
			{#if projectId}
				<input type="hidden" name="project-id" value={projectId} />
			{/if}

			<div class="comment">
				<div class="comment-profile">
					<GradientAvatar user={$page.data?.userData} size="2.25rem" />
					<div class="comment-profile-username">
						{$page.data?.userData?.username ?? 'anonymous user'}
					</div>
				</div>

				<TextInput
					bind:value={content}
					name="content"
					placeholder={parentComment
						? 'Use constructive feedback, be kind and cool.'
						: 'Rate the website, ask me anything...'}
					multiline
				/>
			</div>

			{#if error}
				<InfoBox type="danger">
					{error}
				</InfoBox>
			{/if}

			<div class="actions">
				<div class="content-info" class:error={content.length > commentMaxLength}>
					{#if content.length > commentMaxLength}
						<IconAlertCircleFilled />
					{/if}

					{content.length}/{commentMaxLength}<br />
				</div>

				<Button disabled={loading || content.length > commentMaxLength || !content} type="submit">
					{#if loading}
						<LoaderIcon />
					{:else}
						{$page.data.hasNameChange ? 'Clemb' : parentComment ? 'Reply' : 'Comment'}
					{/if}
				</Button>
			</div>
		</form>
	</Modal>
{/if}

<style lang="scss">
	.parent-comment {
		display: flex;
		gap: 0.25rem;
		margin-bottom: 1rem;

		.branch {
			position: relative;
			color: var(--color-on-surface);
			top: 1rem;
			margin-left: 17.5px;

			:global(svg) {
				height: 24px;
				width: 24px;
			}

			.line {
				position: relative;
				top: -0.5rem;
				height: calc(100% - 1.5rem);
				width: 2px;
				margin: 0;
				background-color: var(--color-on-surface);
			}
		}
	}

	form {
		display: flex;
		flex-direction: column;

		.actions {
			display: flex;
			gap: 0.75rem;
			align-self: flex-end;
			align-items: center;

			.content-info {
				display: flex;
				color: var(--color-on-surface);
				opacity: 1;
				align-items: center;
				gap: 0.25rem;
				padding: 0.25rem 0;
				border-radius: 99rem;

				&.error {
					background-color: var(--color-error);
					color: var(--color-on-error);
					padding-left: 0.25rem;
					padding-right: 0.5rem;
				}
			}
		}

		.comment {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			width: 100%;

			&-profile {
				display: flex;
				gap: 0.5rem;
				align-items: center;

				&-username {
					font-weight: 500;
				}
			}
		}
	}
</style>
