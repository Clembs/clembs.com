<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import IconAlertCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertCircleFilled.svelte';
	// import IconPhoto from '@tabler/icons-svelte/dist/svelte/icons/IconPhoto.svelte';
	// import IconVideo from '@tabler/icons-svelte/dist/svelte/icons/IconVideo.svelte';
	// import IconGif from '@tabler/icons-svelte/dist/svelte/icons/IconGif.svelte';
	import IconMoodSmile from '@tabler/icons-svelte/dist/svelte/icons/IconMoodSmile.svelte';
	import IconHelpCircle from '@tabler/icons-svelte/dist/svelte/icons/IconHelpCircle.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { tick } from 'svelte';
	import type { Comment as CommentType } from '$lib/db/types';
	import FormattingHelpModal from '$lib/components/FormattingHelpModal.svelte';

	export let content = '';
	export let showModal: boolean;
	export let projectId: string | null = null;
	export let parentComment: CommentType | null = null;
	export let expanded = false;

	let error = '';
	let loading = false;
	let showHelpModal = false;
	let commentForm: HTMLFormElement;
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
</script>

<svelte:window
	on:beforeunload={(e) => {
		if (content) {
			e.preventDefault();
			e.returnValue = '';
		}
	}}
	on:keydown={(e) => {
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			commentForm.requestSubmit();
		}
	}}
/>

{#if showHelpModal}
	<FormattingHelpModal showMarkdown={!projectId} bind:showModal={showHelpModal} />
{/if}

<form
	action="/comments?/post"
	method="POST"
	class:expanded
	bind:this={commentForm}
	use:enhance={async () => {
		loading = true;

		await new Promise((resolve) => setTimeout(resolve, 500));

		return ({ result, update }) => {
			loading = false;
			content = '';
			error = '';

			if (result.type === 'success') {
				showModal = false;
				toast.success('Comment sent!');
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

	<!-- svelte-ignore a11y-autofocus -->
	<textarea
		minlength={1}
		maxlength={commentMaxLength}
		name="content"
		placeholder={parentComment
			? 'Use constructive feedback and be respectful.'
			: projectId
			? 'Give feedback, rate this project...'
			: 'Rate the website, ask me anything...'}
		{...expanded ? { autofocus: true } : {}}
		{...$$restProps}
		on:keydown={handleTextboxShortcuts}
		bind:value={content}
	/>

	{#if error}
		<InfoBox type="danger">
			{error}
		</InfoBox>
	{/if}

	<div class="actions">
		<div class="left">
			<Tooltip>
				<span slot="tooltip-content"> Coming soon 👀 </span>
				<Button disabled style="outlined">
					<IconMoodSmile />
				</Button>
			</Tooltip>

			<Tooltip>
				<span slot="tooltip-content"> Formatting help </span>
				<Button style="outlined" on:click={() => (showHelpModal = true)}>
					<IconHelpCircle />
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

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		transition: height 300ms cubic-bezier(0.1, 0.6, 0.4, 1);
		height: 3rem;
		min-height: 3rem;
		max-height: unset;

		&.expanded,
		&:focus-within,
		textarea:not(:placeholder-shown) {
			height: calc(150px + 3rem);

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
			}
		}

		textarea {
			background-color: var(--color-background);
			border: 1px solid var(--color-outline);
			padding: 0.75rem 1rem;
			border-radius: 1.5rem;
			font-family: inherit;
			font-size: inherit;
			width: 100%;
			transition:
				height 200ms cubic-bezier(0.1, 0.6, 0.4, 1),
				border-radius 200ms ease-in-out;
			resize: none;
			height: 3rem;
			min-height: 3rem;
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
			display: flex;
			justify-content: space-between;
			transition: transform 100ms ease-in-out;
			transform: translateY(-3.25rem);
			margin-top: 0.5rem;
			pointer-events: none;

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
	}
</style>
