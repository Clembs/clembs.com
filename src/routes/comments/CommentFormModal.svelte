<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { Comment as CommentType } from '$lib/db/types';
	import Comment from './Comment/Comment.svelte';
	import Curve from '$lib/components/Curve.svelte';
	import { onMount, tick } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import IconAlertCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertCircleFilled.svelte';
	import IconPhoto from '@tabler/icons-svelte/dist/svelte/icons/IconPhoto.svelte';
	import IconVideo from '@tabler/icons-svelte/dist/svelte/icons/IconVideo.svelte';
	import IconGif from '@tabler/icons-svelte/dist/svelte/icons/IconGif.svelte';
	import IconMoodSmile from '@tabler/icons-svelte/dist/svelte/icons/IconMoodSmile.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import { findMediaLinks } from '$lib/helpers/findMediaLinks';
	import Key from '$lib/components/Key.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	export let parentComment: CommentType | null = null;
	export let projectId: string | null = null;
	export let showModal = false;

	let error = '';
	let content = '';
	let loading = false;

	const commentMaxLength = 256;

	const surroundingElementKeys: Record<string, string> = {
		b: '**',
		i: '_',
		s: '~~',
		u: '__',
	};

	async function handleTextboxShortcuts(this: HTMLTextAreaElement, ev: KeyboardEvent) {
		if (!(ev.ctrlKey && ev.key && Object.keys(surroundingElementKeys).includes(ev.key))) return;

		ev.preventDefault();
		const { selectionStart, selectionEnd, value } = this as HTMLTextAreaElement;
		const selection = value.slice(selectionStart, selectionEnd);

		const surroundingElement = surroundingElementKeys[ev.key];
		const surroundedSelection = `${surroundingElement}${selection}${surroundingElement}`;

		if (
			value.slice(
				selectionStart - surroundingElement.length,
				selectionEnd + surroundingElement.length
			) === surroundedSelection
		) {
			content =
				value.slice(0, selectionStart - surroundingElement.length) +
				selection +
				value.slice(selectionEnd + surroundingElement.length);

			await tick();
			this.selectionStart = selectionStart - surroundingElement.length;
			this.selectionEnd = selectionEnd - surroundingElement.length;
		} else {
			content = value.slice(0, selectionStart) + surroundedSelection + value.slice(selectionEnd);

			await tick();
			this.selectionStart = selectionStart + surroundingElement.length;
			this.selectionEnd = selectionEnd + surroundingElement.length;
		}
	}

	$: mediaUrl = findMediaLinks(content)?.last;

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
		<header slot="title">
			<h1>
				{parentComment
					? $page.data.hasNameChange
						? 'Clemb a reply'
						: `Reply to ${parentComment.author?.username ?? 'comment'}`
					: $page.data.hasNameChange
					? 'Write a clemb'
					: 'Write a comment'}
			</h1>
		</header>

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
					content = '';
					error = '';

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
						{$page.data?.userData?.username ?? 'anonymous'}
					</div>
				</div>

				<TextInput
					on:keydown={handleTextboxShortcuts}
					bind:value={content}
					name="content"
					placeholder={parentComment
						? 'Use constructive feedback, be kind and cool.'
						: 'Rate the website, ask me anything...'}
					multiline
				/>
			</div>

			{#if !projectId}
				<div class="keyboard-shortcuts">
					<InfoBox type="info">
						Press <Key>Ctrl/⌘</Key>
						<Key>/</Key> for a list of message formatting shortcuts.
					</InfoBox>
				</div>
			{/if}

			{#if error}
				<InfoBox type="danger">
					{error}
				</InfoBox>
			{/if}

			<div class="actions">
				<div class="left">
					{#if !projectId}
						<Tooltip>
							<span slot="tooltip-content"> Coming soon 👀 </span>
							<Button disabled style="outlined">
								<IconMoodSmile />
							</Button>
						</Tooltip>

						<!-- <Tooltip>
							<span slot="tooltip-content">
								Insert a GIF or .mp4 video URL to have it appear under your comment!
							</span>
							<Button
								disabled
								on:click={() => {
									if (mediaUrl) {
										content = content.replace(mediaUrl, '');
									}
								}}
								style={mediaUrl ? 'filled' : 'outlined'}
							>
								{#if mediaUrl}
									{@const shortenedMediaName = mediaUrl.split('/')?.at(-1)}
									{#if mediaUrl.endsWith('.mp4')}
										<IconVideo />
									{:else}
										<IconGif />
									{/if}
									{(shortenedMediaName?.length || 0) > 15
										? `${shortenedMediaName?.substring(0, 15)}...`
										: shortenedMediaName}
								{:else}
									<IconPhoto /> GIF/Video
								{/if}
							</Button>
						</Tooltip> -->
					{/if}
				</div>

				<div class="right">
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
			</div>
		</form>
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
			justify-content: space-between;

			.right {
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
		}

		.comment {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
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

	@media (max-width: 768px) {
		.keyboard-shortcuts {
			display: none;
		}
	}
</style>
