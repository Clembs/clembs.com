<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';
	import { LoaderIcon } from 'svelte-french-toast';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { slide } from 'svelte/transition';
	import VoteButtons from './VoteButtons.svelte';
	import { enhance } from '$app/forms';
	import '../../../styles/comment.scss';
	import { useShare } from '$lib/components/useShare';
	import ActionButton from './ActionButton.svelte';
	import CommentContent from './CommentContent.svelte';
	import {
		IconMessageCircle,
		IconTrash,
		IconHeartFilled,
		IconHeart,
		IconLink,
	} from '@tabler/icons-svelte';
	import { badges } from '$lib/helpers/badges';
	import { rankBadges } from '$lib/helpers/rankBadges';

	export let comment: Comment;
	export let showActions = true;
	export let parentComment = comment.parentComment;

	export let showLoginModal = false;
	export let showRestrictedFunctionalityModal = false;

	export let showReplyBar =
		!!comment.childComments?.length ||
		(comment.parentComment?.childComments && comment.parentComment?.childComments?.length > 1);

	let loadingComments = false;
	let loadingDelete = false;
	let loadingPin = false;

	$: firstChildComment = comment.childComments?.find(
		(c) => c.author?.badges?.includes('CLEMBS') || c.author?.id === comment.author?.id || c.content
	);

	let data = $page.data;

	const date = snowflakeToDate(comment.id);

	let username = comment.author?.username ?? 'Guest';

	// async function loadChildComments() {
	// 	loadingComments = true;

	// 	if (
	// 		!comment.childComments ||
	// 		comment.childComments.find((c) => !c.content) ||
	// 		(parentComment && parentComment?.childComments?.length !== comment.childComments?.length)
	// 	) {
	// 		try {
	// 			const req = await fetch(`/comments/api/${comment.id}/comments`);

	// 			comment.childComments = await req.json();
	// 		} catch (e) {
	// 			toast.error('Failed loading replies.');
	// 		}
	// 	}

	// 	loadingComments = false;
	// 	childCommentsExpanded = true;
	// }
</script>

<article
	class="comment-wrapper {showActions ? '' : 'no-hover'}"
	id="comment-{comment.id}"
	class:no-actions={!showActions}
>
	<div class="comment" class:has-replies={showReplyBar}>
		<GradientAvatar user={comment.author} size={'1.5rem'} />
		<a href="/comments/{comment.id}" class="comment-main">
			<header class="comment-main-metadata">
				<div class="comment-main-metadata-username">
					{username}
					{#if comment?.author?.badges}
						{@const badge = badges[rankBadges(comment.author.badges)?.[0]]}
						{#if badge}
							<span class="comment-main-metadata-badge" style:--badge-color={badge.color}>
								{badge.label}
							</span>
						{/if}
					{/if}
				</div>

				<time datetime={date.toISOString()} class="subtext">
					{dateFormat(date)}
				</time>
				{#if comment.isPinned}
					<span class="subtext comment-main-metadata-pinned">
						<IconHeartFilled />
					</span>
				{/if}
			</header>
			<CommentContent {comment} dynamicContent={!comment.projectId} showMedia={showActions} />

			{#if showActions}
				<div class="comment-main-actions">
					<VoteButtons {comment} bind:showLoginModal bind:showRestrictedFunctionalityModal />
					<ActionButton href="/comments/{comment.id}#reply" aria-label="Reply to comment">
						<IconMessageCircle />
						Reply
					</ActionButton>
					{#if !parentComment}
						<ActionButton
							aria-label="Share permalink to comment"
							on:click={() => useShare(`${$page.url.origin}/comments/${comment.id}`)}
						>
							<IconLink />
						</ActionButton>
					{/if}
					{#if !comment.parentId && data.userData?.badges?.includes('CLEMBS')}
						<form
							use:enhance={() => {
								loadingPin = true;
								return () => (loadingPin = false);
							}}
							action="/comments/{comment.id}?/pin"
							method="POST"
						>
							<ActionButton aria-label="Feature comment">
								{#if loadingPin}
									<LoaderIcon />
								{:else if comment.isPinned}
									<IconHeartFilled />
								{:else}
									<IconHeart />
								{/if}
							</ActionButton>
						</form>
					{/if}
					{#if (data.userData && data.userData?.id === comment.author?.id) || data.userData?.badges?.includes('CLEMBS')}
						<form
							use:enhance={() => {
								loadingDelete = true;
								return () => (loadingDelete = false);
							}}
							method="POST"
							action="/comments/{comment.id}?/delete"
						>
							<ActionButton aria-label="Delete comment">
								{#if loadingDelete}
									<LoaderIcon />
								{:else}
									<IconTrash />
								{/if}
							</ActionButton>
						</form>
					{/if}
				</div>
			{/if}
		</a>
	</div>

	{#if showActions && firstChildComment}
		<div class="child-comments" transition:slide>
			<svelte:self
				parentComment={comment}
				comment={firstChildComment}
				showContext={false}
				bind:showLoginModal
				bind:showRestrictedFunctionalityModal
			/>
		</div>
	{/if}

	{#if comment.childComments?.length && (!comment.parentId ? comment.childComments?.length > 1 : comment.childComments?.length)}
		<a class="view-replies-button" href="/comments/{comment.id}">
			{#if loadingComments}
				<LoaderIcon />
			{:else}
				<div class="profiles">
					{#each comment.childComments
						.filter((c) => c.id !== firstChildComment?.id)
						.slice(0, 3) as childComment}
						<GradientAvatar user={childComment.author} size="1rem" />
					{/each}
				</div>
				View more replies
			{/if}
		</a>
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

		&.no-actions {
			.comment-main-metadata-username {
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
	}

	.comment {
		display: flex;
		gap: 0.75rem;
		border-radius: 1rem;
		position: relative;

		&.has-replies {
			padding-bottom: 1rem;

			&::before {
				content: '';
				position: absolute;
				left: 10px;
				width: 0.125rem;
				height: 100%;
				background-color: #00000030;
			}
		}

		&-main {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			flex: 1;
			word-break: break-word;
			font-weight: inherit;
			text-decoration: none;
			padding: 0.5rem;
			border-radius: 1rem;
			margin: -0.5rem;

			&:hover {
				background-color: var(--color-surface);
			}
			&:hover,
			&:focus-within {
				.comment-main-actions {
					opacity: 1;
				}
			}

			&-metadata {
				margin-bottom: -0.25rem;
				display: flex;
				// align-items: baseline;
				gap: 0.75rem;
				align-items: center;

				&-username {
					border-radius: 0.5rem;
					font-weight: 500;
					color: var(--color-on-background);
				}

				&-badge {
					font-size: 0.75rem;
					padding: 0.125rem 0.25rem;
					border-radius: 15rem;
					background-color: var(--color-surface);
					color: var(--badge-color);
					font-weight: 500;
				}

				&-pinned {
					color: var(--color-error);
					font-weight: 500;
					display: grid;

					:global(svg) {
						width: 1rem;
						height: 1rem;
					}
				}
			}

			&-actions {
				display: flex;
				gap: 0.25rem;
				opacity: 0.25;
				transition: opacity 150ms ease-in-out;
			}
		}
	}

	.view-replies-button {
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
		margin-top: -0.25rem;
		padding: 0.25rem 0.5rem;
		background-color: transparent;
		text-decoration: none;

		&:hover {
			background-color: var(--color-surface);
			text-decoration: underline;
		}

		.profiles {
			display: flex;

			:global(.avatar) {
				margin-left: -0.25rem;
			}
		}
	}
</style>
