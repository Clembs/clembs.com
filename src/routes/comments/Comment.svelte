<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconChevronDown from '@tabler/icons-svelte/dist/svelte/icons/IconChevronDown.svelte';
	import IconTrash from '@tabler/icons-svelte/dist/svelte/icons/IconTrash.svelte';
	import IconPinFilled from '@tabler/icons-svelte/dist/svelte/icons/IconPinFilled.svelte';
	import IconPin from '@tabler/icons-svelte/dist/svelte/icons/IconPin.svelte';
	import { createEventDispatcher } from 'svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import { dateFormat, relativeTimeFormat } from '$lib/helpers/dateFormat';
	import { slide } from 'svelte/transition';
	import insane from 'insane';
	import { marked } from 'marked';
	import { findMediaLinks } from '$lib/helpers/findMediaLinks';
	import Tooltip from '$lib/components/Tooltip.svelte';

	export let comment: Comment;
	export let showActions = true;
	export let initialNestingLevel = 0;
	export let childCommentsExpanded = false;

	let nestingLevel = initialNestingLevel;
	let childComments = comment.childComments;
	let loadingComments = false;
	let loadingDelete = false;
	let commentDeleted = false;
	let loadingPin = false;

	let data = $page.data;

	const dispatch = createEventDispatcher();
	const date = snowflakeToDate(comment.id);

	let username = comment.author?.username ?? 'anonymous';

	const mediaUrl = findMediaLinks(comment.content)?.last;

	async function accessUserInfo() {
		dispatch('userinfo', comment.author);
	}

	async function replyComment() {
		if (data.userData?.badges?.includes('BLOCKED')) {
			dispatch('blocked');
			return;
		}

		dispatch('reply', comment);
	}

	async function deleteComment() {
		loadingDelete = true;

		try {
			const res = await fetch(`/comments/api/${comment.id}/delete`, {
				method: 'DELETE',
			});

			if (res.ok) {
				toast.success(`Successfully deleted.`);
				loadingDelete = false;
				commentDeleted = true;
			}
		} catch (e) {
			toast.error(
				`Something went wrong while trying to delete this ${
					$page.data.hasNameChange ? 'clemb' : 'comment'
				}.`
			);
		}
	}

	async function pinComment() {
		loadingPin = true;

		try {
			const res = await fetch(`/comments/api/${comment.id}/pin`, {
				method: 'PATCH',
			});

			if (res.ok) {
				toast.success(`Successfully (un)pinned.`);
				loadingPin = false;
				comment.isPinned = !comment.isPinned;
			}
		} catch (e) {
			toast.error(`Something went wrong while trying to pin this comment.`);
		}
	}

	async function loadChildComments() {
		if (childCommentsExpanded) {
			childCommentsExpanded = false;
			return;
		}

		loadingComments = true;

		if (!childComments || !childComments.find((c) => c.author)) {
			try {
				const req = await fetch(`/comments/api/${comment.id}/comments`);

				childComments = await req.json();
			} catch (e) {
				toast.error('Failed loading replies.');
			}
		}

		loadingComments = false;
		childCommentsExpanded = true;
	}
</script>

<svelte:head>
	<style src="../../styles/comment.scss"></style>
</svelte:head>

{#if !commentDeleted}
	<div
		class="comment-wrapper {showActions ? '' : 'no-hover'}"
		id="comment-{comment.id}"
		class:reply={nestingLevel}
		class:no-actions={!showActions}
	>
		<div class="comment">
			{#if showActions}
				<button on:click={accessUserInfo} class="comment-avatar">
					<GradientAvatar user={comment.author} size={!nestingLevel ? '2rem' : '1.5rem'} />
				</button>
			{:else}
				<GradientAvatar user={comment.author} size={!nestingLevel ? '2rem' : '1.5rem'} />
			{/if}
			<div class="comment-text">
				<div class="comment-text-metadata">
					<div class="comment-text-metadata-left">
						{#if showActions}
							<button on:click={accessUserInfo} class="comment-text-metadata-left-username">
								{username}
							</button>
						{:else}
							<div class="comment-text-metadata-left-username">
								{username}
							</div>
						{/if}
						<Tooltip transitionDelay={500}>
							<time datetime={date.toISOString()} class="comment-text-metadata-left-timestamp">
								{relativeTimeFormat(date)}
							</time>
							<span slot="tooltip-content">
								{dateFormat(date)}
							</span>
						</Tooltip>
						{#if comment.isPinned}
							<span class="comment-text-metadata-left-pinned">Pinned by Clembs</span>
						{/if}
					</div>
				</div>
				<div class="comment-text-content">
					{#if !comment.projectId}
						{@html insane(
							marked(comment.content.replace(mediaUrl ?? '', ''), {
								breaks: true,
								gfm: true,
							})
						)}
					{:else}
						{comment.content}
					{/if}

					{#if showActions && !comment.projectId && mediaUrl}
						<div class="comment-text-content-media">
							{#if mediaUrl.endsWith('.mp4')}
								<!-- svelte-ignore a11y-media-has-caption -->
								<video src={mediaUrl} controls />
							{:else}
								<img
									loading="lazy"
									draggable="false"
									src={!mediaUrl.endsWith('.gif') ? `${mediaUrl}.gif` : mediaUrl}
									alt="GIF"
								/>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>

		{#if showActions}
			<div class="actions">
				<button class="action-button" on:click={replyComment}>
					<IconMessageCircle />
					Reply
				</button>
				{#if (data.userData && data.userData?.id === comment.author?.id) || data.userData?.badges?.includes('CLEMBS')}
					<button class="action-button" on:click={deleteComment}>
						{#if loadingDelete}
							<LoaderIcon />
						{:else}
							<IconTrash />
							Delete
						{/if}
					</button>
				{/if}
				{#if !comment.parentId && data.userData?.badges?.includes('CLEMBS')}
					<button class="action-button" on:click={pinComment}>
						{#if loadingPin}
							<LoaderIcon />
						{:else if comment.isPinned}
							<IconPinFilled />
							Unpin
						{:else}
							<IconPin />
							Pin
						{/if}
					</button>
				{/if}
				{#if comment.childComments?.length}
					<button class="action-button" on:click={loadChildComments}>
						{#if loadingComments}
							<LoaderIcon />
						{:else}
							<div class="expand-icon" aria-expanded={childCommentsExpanded}>
								<IconChevronDown />
							</div>
							{comment.childComments?.length}
							{comment.childComments?.length === 1 ? 'reply' : 'replies'}
						{/if}
					</button>
				{/if}
			</div>
		{/if}

		{#if childComments && childCommentsExpanded}
			<div class="child-comments" class:margin-left={nestingLevel < 3} transition:slide>
				{#each childComments as comment}
					<svelte:self
						{comment}
						initialNestingLevel={nestingLevel + 1}
						on:blocked
						on:userinfo
						on:reply
					/>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border-radius: 1rem;
		text-decoration: none;
		position: relative;
		width: 100%;

		&.no-hover {
			cursor: default;
		}

		&.reply {
			.child-comments {
				margin-left: 2.5rem;
			}

			.actions {
				margin-left: 2rem;
			}
		}

		&.no-actions {
			.comment-avatar {
				cursor: default;
			}

			.comment-text-metadata-left-username {
				cursor: default;

				&:hover {
					text-decoration: inherit;
				}
			}
		}
	}

	.child-comments {
		margin: 0.5rem 0;
		margin-left: 3rem;
	}

	.actions {
		display: flex;
		margin-left: 2.5rem;
		font-family: monospace;
		gap: 0.25rem;

		.action-button {
			border: none;
			color: var(--color-on-surface);
			background-color: transparent;
			border-radius: 0.75rem;
			display: flex;
			align-items: center;
			padding: 0.5rem 0.5rem;
			cursor: pointer;
			gap: 0.5rem;
			font-size: 0.9rem;
			max-width: max-content;
			font-family: inherit;

			&:hover {
				background-color: var(--color-surface);
			}

			.expand-icon {
				display: grid;
				align-items: center;
				transition: rotate cubic-bezier(0.64, 0.005, 0.43, 1.01) 150ms;

				&[aria-expanded='true'] {
					rotate: 180deg;
				}
			}

			:global(svg) {
				width: 18px;
				height: 18px;
			}
		}
	}

	.comment {
		display: flex;
		gap: 1rem;

		&-avatar {
			appearance: none;
			margin: 0;
			border: 0;
			padding: 0;
			background-color: transparent;
			border-radius: 99rem;
			cursor: pointer;
			height: min-content;
		}

		&-text {
			flex: 1;
			word-break: break-word;

			&-content {
				&-media {
					margin-top: 0.5rem;

					video,
					img {
						border-radius: 0.5rem;
						border: 1px solid var(--color-outline);
						box-shadow: 0 2px 0 0 var(--color-outline);
						max-width: 200px;
					}
				}
			}

			&-metadata {
				padding-bottom: 0.25rem;
				display: flex;
				justify-content: space-between;

				&-left {
					display: flex;
					gap: 0.5rem;
					align-items: baseline;
					font-size: 0.9rem;
					color: var(--color-on-surface);

					&-username {
						appearance: none;
						margin: 0;
						border: 0;
						padding: 0;
						background-color: transparent;
						font-size: 1.1rem;
						border-radius: 0.5rem;
						font-weight: 500;

						&:hover {
							text-decoration: underline;
						}
					}

					&-pinned {
						// background: var(--main-gradient);
						// -webkit-background-clip: text;
						// -webkit-text-fill-color: transparent;
						color: var(--color-primary);
						font-weight: 600;
					}
				}
			}
		}
	}
</style>
