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
	import VoteButtons from './VoteButtons.svelte';

	export let comment: Comment;
	export let showActions = true;
	export let initialNestingLevel = 0;

	let nestingLevel = initialNestingLevel;
	let childComments = comment.childComments;
	let loadingComments = false;
	let loadingDelete = false;
	let commentDeleted = false;
	let loadingPin = false;

	export let childCommentsExpanded = false;

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

		if (!childComments || childComments.find((c) => c.userId && !c.author)) {
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
	<style src="../../../styles/comment.scss"></style>
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
					<GradientAvatar user={comment.author} size={!nestingLevel ? '2.5rem' : '1.5rem'} />
				</button>
			{:else}
				<GradientAvatar user={comment.author} size="1.5rem" />
			{/if}
			<div class="comment-main">
				<div class="comment-main-text">
					<div class="comment-main-text-metadata">
						<div class="comment-main-text-metadata-left">
							{#if showActions}
								<button on:click={accessUserInfo} class="comment-main-text-metadata-left-username">
									{username}
								</button>
							{:else}
								<div class="comment-main-text-metadata-left-username">
									{username}
								</div>
							{/if}
							•
							<Tooltip transitionDelay={500}>
								<time
									datetime={date.toISOString()}
									class="comment-main-text-metadata-left-timestamp"
								>
									{relativeTimeFormat(date)}
								</time>
								<span slot="tooltip-content">
									{dateFormat(date)}
								</span>
							</Tooltip>
							{#if comment.isPinned}
								<span class="comment-main-text-metadata-left-pinned">Pinned by Clembs</span>
							{/if}
						</div>
					</div>
					<div class="comment-main-text-content">
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
							<div class="comment-main-text-content-media">
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

				{#if showActions}
					<div class="comment-main-actions">
						<div class="comment-main-actions-row">
							<VoteButtons {comment} on:login on:blocked />
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
									{/if}
								</button>
							{/if}
							{#if !comment.parentId && data.userData?.badges?.includes('CLEMBS')}
								<button class="action-button" on:click={pinComment}>
									{#if loadingPin}
										<LoaderIcon />
									{:else if comment.isPinned}
										<IconPinFilled />
									{:else}
										<IconPin />
									{/if}
								</button>
							{/if}
						</div>

						{#if comment.childComments?.length}
							<button class="action-button view-replies" on:click={loadChildComments}>
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
			</div>
		</div>

		{#if showActions && childComments?.length && childCommentsExpanded}
			<div class="child-comments" class:margin-left={nestingLevel < 5} transition:slide>
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
		gap: 0.75rem;
		border-radius: 1rem;
		text-decoration: none;
		position: relative;
		width: 100%;

		&.no-hover {
			cursor: default;
		}

		&.reply {
			.child-comments.margin-left {
				margin-left: 2.5rem;
			}
		}

		&.no-actions {
			.comment-avatar {
				cursor: default;
			}

			.comment-main-text-metadata-left-username {
				cursor: default;

				&:hover {
					text-decoration: inherit;
				}
			}
		}
	}

	.child-comments {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&.margin-left {
			margin-left: 3.25rem;
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

		&-main {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			flex: 1;
			word-break: break-word;

			&-text {
				&-content {
					font-size: 15px;

					&-media {
						margin-top: 0.5rem;

						video,
						img {
							border-radius: 0.5rem;
							border: 1px solid var(--color-outline);
							box-shadow: 0 2px 0 0 var(--color-outline);
							max-width: 250px;
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

			&-actions {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				margin-left: -0.5rem;

				&-row {
					display: flex;
					gap: 0.25rem;
				}

				.action-button {
					border: none;
					color: var(--color-on-surface);
					background-color: var(--color-surface);
					border-radius: 9rem;
					display: flex;
					align-items: center;
					padding: 0.45rem 0.615rem;
					cursor: pointer;
					gap: 0.5rem;
					font-size: 0.8rem;
					max-width: max-content;
					font-weight: 500;

					&:hover {
						background-color: var(--color-surface);
					}

					&.view-replies {
						margin-top: 0.25rem;
						padding: 0.25rem 0.5rem;
						background-color: transparent;

						&:hover {
							background-color: var(--color-surface);
							text-decoration: underline;
						}

						.expand-icon {
							display: grid;
							align-items: center;
							transition: rotate cubic-bezier(0.64, 0.005, 0.43, 1.01) 150ms;

							&[aria-expanded='true'] {
								rotate: 180deg;
							}
						}
					}

					:global(svg) {
						width: 20px;
						height: 20px;
					}
				}
			}
		}
	}
</style>
