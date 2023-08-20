<script lang="ts">
	import type { Comment } from './+page.server';
	import IconHeart from '@tabler/icons-svelte/dist/svelte/icons/IconHeart.svelte';
	import IconHeartFilled from '@tabler/icons-svelte/dist/svelte/icons/IconHeartFilled.svelte';
	import IconArrowBackUp from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconShare from '@tabler/icons-svelte/dist/svelte/icons/IconShare3.svelte';
	import IconCirclePlus from '@tabler/icons-svelte/dist/svelte/icons/IconCirclePlus.svelte';
	import { createEventDispatcher } from 'svelte';
	import { useShare } from '$lib/components/useShare';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import { relativeTimeFormat } from '$lib/helpers/relativeTimeFormat';
	import type { PageData } from '../$types';

	export let comment: Comment;
	export let showActions = true;
	export let data: PageData;

	const dispatch = createEventDispatcher();
	const date = snowflakeToDate(comment.id);

	let hasLiked = data.userData
		? !!comment.userLikes.find((e) => e.userId === $page.data?.userData?.id)
		: false;
	let likes = comment.userLikes?.length ?? 0;

	let username = comment.author?.username ?? 'anonymous user';

	async function likeComment() {
		if (!data.userData) {
			dispatch('login');
			return;
		}

		hasLiked = !hasLiked;
		likes = likes + (hasLiked ? 1 : -1);

		try {
			const req = await fetch(`/comments/api/${comment.id}/like`, {
				method: 'PUT',
			});

			if (req.ok) {
				return;
			}

			hasLiked = !hasLiked;
			likes = likes + (hasLiked ? 1 : -1);
			toast.error(
				`Something went wrong while trying to (un)like comment ${comment.id}. Try again later.`
			);
		} catch (e) {
			hasLiked = !hasLiked;
			likes = likes + (hasLiked ? 1 : -1);
			toast.error(
				`Something went wrong while trying to (un)like comment ${comment.id}. Try again later.`
			);
		}
	}

	async function replyComment() {
		dispatch('reply', comment);
	}

	async function loadReplies() {}
</script>

<a
	tabindex={showActions ? 0 : -1}
	class="comment-wrapper {showActions ? '' : 'no-hover'}"
	href={showActions ? `/comments/${comment.id}` : '#'}
	data-comment-id={comment.id}
>
	<div class="comment">
		<GradientAvatar user={comment.author} />
		<div class="comment-text">
			<div class="comment-text-metadata">
				<span class="comment-text-metadata-username">
					{username}
				</span>
				<time datetime={date.toISOString()} class="comment-text-metadata-timestamp">
					{relativeTimeFormat(date)}
				</time>
			</div>
			<div class="comment-text-content">
				{comment.content}
			</div>
		</div>
	</div>

	{#if showActions}
		<div class="actions">
			<div class="main-actions">
				<button
					class="action-button"
					data-liked={hasLiked}
					on:click|preventDefault|stopPropagation={likeComment}
				>
					{#if hasLiked}
						<IconHeartFilled />
					{:else}
						<IconHeart />
					{/if}

					{likes}
				</button>
				<button class="action-button" on:click|preventDefault|stopPropagation={replyComment}>
					<IconArrowBackUp />
					{comment.childComments?.length || 0}
				</button>
				<button
					class="action-button"
					on:click|preventDefault|stopPropagation={() =>
						useShare(`https://clembs.com/comments/${comment.id}`)}
				>
					<IconShare />
				</button>
			</div>

			{#if comment.childComments?.length}
				<!-- <button on:click|preventDefault|stopPropagation={loadReplies}> -->
				<div class="action-button">
					<IconCirclePlus /> View {comment.childComments?.length}
					{comment.childComments?.length === 1 ? 'reply' : 'replies'}
				</div>
				<!-- </button> -->
			{/if}
		</div>
	{/if}
</a>

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem;
		border-radius: 1rem;
		text-decoration: none;

		&.no-hover {
			cursor: default;
		}

		&:hover:not(.no-hover) {
			background-color: #eeeeee;
		}
	}

	.actions {
		display: flex;
		flex-direction: column;
		margin-left: 2.5rem;

		.main-actions {
			display: flex;
			font-family: monospace;
		}

		.action-button {
			border: none;
			color: var(--color-on-surface);
			background-color: transparent;
			border-radius: 0.5rem;
			display: flex;
			align-items: center;
			padding: 0.5rem 0.615rem;
			cursor: pointer;
			gap: 0.5rem;
			font-size: 0.9rem;
			max-width: max-content;
			font-family: inherit;

			&:hover {
				background-color: var(--color-surface);
			}

			&[data-liked='true'] {
				color: #643fff;
				font-weight: 500;
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
		&-text {
			flex: 1;

			&-metadata {
				padding-bottom: 0.25rem;
				display: flex;
				justify-content: space-between;
				align-items: baseline;

				&-username {
					font-weight: 500;
				}

				&-timestamp {
					font-size: 0.9rem;
					margin-left: 0.5rem;
					color: var(--color-on-surface);
				}
			}
		}
	}
</style>
