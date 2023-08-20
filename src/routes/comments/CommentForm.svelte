<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import IconAlertCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertCircleFilled.svelte';
	import toast from 'svelte-french-toast';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import type { Comment as CommentType } from './+page.server';

	export let parentComment: CommentType | null = null;
	export let showModal = false;
	export let formComponent: HTMLFormElement | null = null;
	let error = '';
	let content = '';
</script>

<form
	action="/comments?/post"
	method="POST"
	bind:this={formComponent}
	use:enhance={() =>
		({ result, update }) => {
			if (result.type === 'success') {
				showModal = false;
				toast.success('Comment sent!');
			}
			if (result.type === 'failure') {
				error = result.data?.message;
			}

			update();
		}}
>
	{#if parentComment}
		<input type="hidden" name="parent-comment" value={parentComment.id} />
	{/if}

	<div class="comment">
		<GradientAvatar user={$page.data?.userData} size="2.25rem" />
		<div class="comment-text">
			<span class="comment-text-username">
				{$page.data?.userData?.username ?? 'anonymous user'}
			</span>

			<TextInput
				bind:value={content}
				name="content"
				placeholder={parentComment
					? 'Use constructive feedback, be kind and cool.'
					: 'Rate the website, ask me anything...'}
				multiline
			/>
		</div>
	</div>

	{#if error}
		<InfoBox type="danger">
			{error}
		</InfoBox>
	{/if}

	<div class="actions">
		<div class="content-info" class:error={content.length > 512}>
			{#if content.length > 512}
				<IconAlertCircleFilled />
			{/if}

			{content.length}/512<br />
		</div>

		<Button disabled={content.length > 512 || !content} type="submit">
			{parentComment ? 'Reply' : 'Comment'}
		</Button>
	</div>
</form>

<style lang="scss">
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
			gap: 1rem;
			width: 100%;

			&-text {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				&-username {
					font-weight: 500;
				}
			}
		}
	}
</style>
