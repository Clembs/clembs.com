<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { IconAlertCircleFilled } from '@tabler/icons-svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import type { Comment as CommentType } from '$lib/db/types';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { showLoginDialog, showRestrictedAccountDialog } from '$lib/stores/modals';

	export let content = '';
	export let projectId: string | null = null;
	export let parentComment: CommentType | null = null;
	export let expanded = false;

	let error = '';
	let loading = false;
	let commentForm: HTMLFormElement;
	const commentMaxLength = 420;
</script>

<svelte:window
	on:beforeunload={(e) => {
		if (content) {
			e.preventDefault();
			e.returnValue = '';
		}
	}}
	on:keydown={(e) => {
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && content) {
			e.preventDefault();
			commentForm.requestSubmit();
		}
		if (e.key === 'Escape') {
			expanded = false;
			commentForm.querySelector('textarea')?.blur();
		}
	}}
/>

<form
	action="/comments?/post"
	method="POST"
	class:expanded={expanded || content}
	bind:this={commentForm}
	use:enhance={async () => {
		loading = true;

		await new Promise((resolve) => setTimeout(resolve, 500));

		return async ({ result, update }) => {
			loading = false;
			content = '';
			error = '';

			if (result.type === 'success') {
				toast.success('Comment sent!');
			}
			if (result.type === 'failure' && typeof result.data?.message === 'string') {
				error = result.data?.message;
			}
			if (result.type === 'error') {
				error = result.error?.message;
				return;
			}
			if ('message' in result) {
				error = String(result.message);
			}

			await update({
				reset: true,
			});
		};
	}}
>
	{#if parentComment}
		<input type="hidden" name="parent-comment" value={parentComment.id} />
	{/if}
	{#if projectId}
		<input type="hidden" name="project-id" value={projectId} />
	{/if}

	<div class="comment-profile">
		<GradientAvatar user={$page.data?.userData} size="2.5rem" />
	</div>

	<div class="comment-editor">
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			minlength={1}
			maxlength={commentMaxLength}
			name="content"
			placeholder={parentComment
				? 'Reply with constructive feedback and respect.'
				: projectId
					? 'Give feedback, rate this project...'
					: 'Leave suggestions, questions, rate the website...'}
			{...expanded ? { autofocus: true } : {}}
			{...$$restProps}
			bind:value={content}
			on:focus={() => {
				expanded = true;
				if ($page.data.userData?.badges?.includes('BLOCKED')) {
					showRestrictedAccountDialog.set(true);
					document.querySelector('textarea')?.blur();
				}
			}}
		/>

		<div class="actions">
			<div class="content-info" class:error>
				{#if error}
					<IconAlertCircleFilled />
				{/if}

				{#if error}
					{error} •
				{/if}
				{content.length}/{commentMaxLength}
			</div>

			{#if !$page.data?.userData}
				<Button type="button" on:click={() => showLoginDialog.set(true)} style="outlined">
					Use an account?
				</Button>
			{/if}

			<Button disabled={loading || content.length > commentMaxLength || !content} type="submit">
				{#if loading}
					<LoaderIcon />
				{:else}
					{parentComment ? 'Reply' : 'Comment'}
				{/if}
			</Button>
		</div>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		transition: height 300ms cubic-bezier(0.1, 0.6, 0.4, 1);
		height: 2.5rem;
		min-height: 2.5rem;
		max-height: unset;
		gap: 0.75rem;

		.comment-profile {
			display: flex;

			&-username {
				font-weight: 500;
				font-size: 1.1rem;
			}
		}

		.comment-editor {
			width: 100%;
		}

		&.expanded,
		&:focus-within,
		textarea:not(:placeholder-shown) {
			height: calc(150px + 3.5rem);

			textarea {
				height: 150px;
				border-radius: 0.75rem;
				transition:
					height 200ms cubic-bezier(0.1, 0.6, 0.4, 1),
					border-radius 200ms ease-in-out,
					z-index 200ms ease 200ms;
				white-space: normal;
				text-overflow: initial;
				z-index: 0;
			}

			.actions {
				transform: translateY(0);
				pointer-events: all;
				clip-path: inset(0px 0px 0px 0px);
			}
		}

		textarea {
			background-color: var(--color-background);
			color: var(--color-on-background);
			border: 1px solid var(--color-outline);
			padding: 0.5rem 0.75rem;
			border-radius: 1.5rem;
			font-family: inherit;
			font-size: inherit;
			width: 100%;
			transition:
				height 200ms cubic-bezier(0.1, 0.6, 0.4, 1),
				border-radius 200ms ease-in-out;
			resize: none;
			height: 2.5rem;
			min-height: 2.5rem;
			max-height: unset;
			position: relative;
			z-index: 2;
			white-space: nowrap;
			text-overflow: ellipsis;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			&:not(:focus) {
				cursor: pointer;

				&:hover {
					background-color: var(--color-surface);
				}
			}
		}

		.actions {
			clip-path: inset(-45px 0px 45px 0px);
			display: flex;
			transition:
				transform 100ms ease-in-out,
				clip-path 100ms ease-in-out;
			transform: translateY(-3.25rem);
			margin-top: 0.5rem;
			pointer-events: none;

			align-items: center;
			justify-content: flex-end;
			gap: 0.75rem;

			.content-info {
				display: flex;
				color: var(--color-on-surface);
				opacity: 1;
				align-items: center;
				gap: 0.25rem;
				padding: 0.25rem 0;
				border-radius: 99rem;

				&.error {
					color: var(--color-error);
				}
			}
		}
	}
</style>
