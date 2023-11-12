<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconChevronDown from '@tabler/icons-svelte/dist/svelte/icons/IconChevronDown.svelte';
	import IconTrash from '@tabler/icons-svelte/dist/svelte/icons/IconTrash.svelte';
	import IconStarFilled from '@tabler/icons-svelte/dist/svelte/icons/IconStarFilled.svelte';
	import IconStar from '@tabler/icons-svelte/dist/svelte/icons/IconStar.svelte';
	import IconLink from '@tabler/icons-svelte/dist/svelte/icons/IconLink.svelte';
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
	import { parseMentions } from '$lib/helpers/parseMentions';
	import Mention from './Mention.svelte';
	import Emoji from '$lib/components/Emoji.svelte';
	import { enhance } from '$app/forms';
	import '../../../styles/comment.scss';
	import { useShare } from '$lib/components/useShare';
	import ActionButton from './ActionButton.svelte';

	export let comment: Comment;
	export let showActions = true;
	export let initialNestingLevel = 0;

	let nestingLevel = initialNestingLevel;
	let childComments = comment.childComments;
	let loadingComments = false;

	export let childCommentsExpanded = false;

	let data = $page.data;

	const dispatch = createEventDispatcher();
	const date = snowflakeToDate(comment.id);

	let username = comment.author?.username ?? 'Guest';

	const mediaUrl = findMediaLinks(comment.content)?.last;

	async function replyComment() {
		if (data.userData?.badges?.includes('BLOCKED')) {
			dispatch('blocked');
			return;
		}

		dispatch('reply', comment);
	}

	async function loadChildComments() {
		if (childCommentsExpanded) {
			childCommentsExpanded = false;
			return;
		}

		loadingComments = true;

		if (!childComments || childComments.find((c) => c.userId && !c.score)) {
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

<article
	class="comment-wrapper {showActions ? '' : 'no-hover'}"
	id="comment-{comment.id}"
	class:reply={nestingLevel}
	class:no-actions={!showActions}
>
	<div class="comment" class:pinned={comment.isPinned}>
		{#if showActions && comment.author}
			<a href="/users/{comment.author?.username}" class="comment-avatar">
				<GradientAvatar user={comment.author} size={!nestingLevel ? '2.5rem' : '1.5rem'} />
			</a>
		{:else}
			<GradientAvatar user={comment.author} size={!nestingLevel ? '2.5rem' : '1.5rem'} />
		{/if}
		<div class="comment-main">
			<div class="comment-main-text">
				<header class="comment-main-text-metadata">
					{#if showActions && comment.author}
						<a href="/users/{comment.author?.username}" class="comment-main-text-metadata-username">
							{username}
						</a>
					{:else}
						<div class="comment-main-text-metadata-username">
							{username}
						</div>
					{/if}

					<Tooltip transitionDelay={500}>
						<time datetime={date.toISOString()} class="subtext">
							{relativeTimeFormat(date)}
						</time>
						<span slot="tooltip-content">
							{dateFormat(date)}
						</span>
					</Tooltip>
					{#if comment.isPinned}
						<span class="subtext comment-main-text-metadata-pinned">Featured</span>
					{/if}
				</header>
				<div class="comment-main-text-content">
					{#if !comment.projectId}
						{#each parseMentions(comment.content) as part}
							{#if typeof part === 'string'}
								{@html insane(
									marked.parseInline(part.replace(mediaUrl ?? '', ''), {
										breaks: true,
										gfm: true,
									})
								)}
							{:else if part.type === 'user'}
								{@const user = comment.mentionedUsers?.find(({ user }) =>
									part.type === 'user' ? user.username === part.username : null
								)?.user}
								{#if user}
									<Mention node={part} />
								{:else}
									@{part.username}
								{/if}
							{:else if part.type === 'project'}
								<Mention node={part} />
							{:else if part.type === 'emoji'}
								<Emoji name={part.emojiId} src="/assets/emotes/{part.emojiId}.webp" />
							{/if}
						{/each}
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
						<ActionButton aria-label="Reply to comment" on:click={replyComment}>
							<IconMessageCircle />
							Reply
						</ActionButton>
						<ActionButton
							aria-label="Share permalink to comment"
							on:click={() => useShare(`${$page.url.origin}/comments/${comment.id}`)}
						>
							<IconLink />
						</ActionButton>
						{#if !comment.parentId && data.userData?.badges?.includes('CLEMBS')}
							<form use:enhance action="/comments/{comment.id}?/pin" method="POST">
								<ActionButton aria-label="Feature comment">
									{#if comment.isPinned}
										<IconStarFilled />
									{:else}
										<IconStar />
									{/if}
								</ActionButton>
							</form>
						{/if}
						{#if (data.userData && data.userData?.id === comment.author?.id) || data.userData?.badges?.includes('CLEMBS')}
							<form use:enhance method="POST" action="/comments/{comment.id}?/delete">
								<ActionButton aria-label="Delete comment">
									<IconTrash />
								</ActionButton>
							</form>
						{/if}
					</div>

					{#if comment.childComments?.length}
						<button class="view-replies-button" on:click={loadChildComments}>
							{#if loadingComments}
								<LoaderIcon />
							{:else}
								<div class="expand-icon" aria-expanded={childCommentsExpanded}>
									<IconChevronDown />
								</div>
								{comment.childComments.length}
								{comment.childComments.length === 1 ? 'reply' : 'replies'}
								{#if comment.childComments.find(({ author }) => author && author?.badges?.includes('CLEMBS'))}
									• Clembs replied
								{/if}
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
</article>

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		text-decoration: none;
		position: relative;
		width: 100%;

		&.no-hover {
			cursor: default;
			pointer-events: none;
		}

		&.reply .child-comments.margin-left {
			margin-left: 2.5rem;
		}

		&.no-actions {
			.comment-avatar {
				cursor: default;
			}

			.comment-main-text-metadata-username {
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
		gap: 0.5rem;

		&.margin-left {
			margin-left: 3.25rem;
		}
	}

	.comment {
		display: flex;
		gap: 1rem;
		border-radius: 1rem;

		&.pinned {
			background: linear-gradient(10deg, rgb(255 0 0 / 0.01), rgb(255 0 0 / 0.05));
		}

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

						// video,
						// img {
						// 	border-radius: 0.5rem;
						// 	border: 1px solid var(--color-outline);
						// 	box-shadow: 0 2px 0 0 var(--color-outline);
						// 	max-width: 250px;
						// }
					}
				}

				&-metadata {
					padding-bottom: 0.25rem;
					display: flex;
					align-items: baseline;
					gap: 0.5rem;

					&-username {
						border-radius: 0.5rem;
						font-weight: 500;
						user-select: text;
						display: inline-block;
						color: var(--color-on-background);

						&:hover {
							text-decoration: underline;
						}
					}

					&-pinned {
						color: var(--color-error);
						font-weight: 500;
					}
				}
			}

			&-actions {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				margin-left: -0.25rem;

				&-row {
					display: flex;
					gap: 0.25rem;
				}

				.view-replies-button {
					border: none;
					color: var(--color-on-surface);
					background-color: var(--color-background);
					border-radius: 9rem;
					display: flex;
					align-items: center;
					cursor: pointer;
					gap: 0.5rem;
					font-size: 0.8rem;
					max-width: max-content;
					font-weight: 500;
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

						:global(svg) {
							width: 1rem;
							height: 1rem;
						}

						&[aria-expanded='true'] {
							rotate: 180deg;
						}
					}
				}
			}
		}
	}
</style>
