<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import IconHeart from '@tabler/icons-svelte/dist/svelte/icons/IconHeart.svelte';
	import IconHeartFilled from '@tabler/icons-svelte/dist/svelte/icons/IconHeartFilled.svelte';
	import IconArrowBackUp from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconCopy from '@tabler/icons-svelte/dist/svelte/icons/IconCopy.svelte';
	import IconShare from '@tabler/icons-svelte/dist/svelte/icons/IconShare3.svelte';
	import { createEventDispatcher } from 'svelte';
	import { useShare } from '$lib/components/useShare';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import { relativeTimeFormat } from '$lib/helpers/relativeTimeFormat';

	export let comment: Comment;

	const dispatch = createEventDispatcher();
	const date = snowflakeToDate(comment.id);

	let hasLiked = $page.data.userData
		? !!comment.userLikes?.find((e) => e.userId === $page.data?.userData?.id)
		: false;
	let likes = comment.userLikes?.length ?? 0;

	let username = comment.author?.username ?? 'anonymous user';

	async function likeComment() {
		if (!$page.data.userData) {
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
</script>

<div class="comment-wrapper" data-comment-id={comment.id}>
	<div class="comment">
		<div class="comment-metadata">
			<div class="comment-metadata-author">
				<GradientAvatar user={comment.author} />
				<span class="comment-metadata-author-username">
					{username}
				</span>
			</div>

			<time datetime={date.toISOString()} class="comment-metadata-timestamp">
				{relativeTimeFormat(date)}
			</time>
		</div>

		<div class="comment-text">
			{comment.content}
		</div>
	</div>

	<div class="actions">
		<button data-liked={hasLiked} on:click={likeComment}>
			{#if hasLiked}
				<IconHeartFilled />
			{:else}
				<IconHeart />
			{/if}

			<span class="button-label">
				{likes}
				{likes === 1 ? 'like' : 'likes'}
			</span>
		</button>
		<button on:click={replyComment}>
			<IconArrowBackUp />
			<span class="button-label"> Reply </span>
		</button>
		<button on:click={() => useShare(`${$page.url.origin}/comments/${comment.id}`)}>
			<IconShare />
			<span class="button-label"> Share </span>
		</button>
		<button style="flex-grow: 1;" on:click={() => navigator.clipboard.writeText(comment.id)}>
			<IconCopy />
			<span class="button-label"> Copy Comment ID </span>
		</button>
	</div>
</div>

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		text-decoration: none;
		border-bottom: 1px solid var(--color-surface);
	}

	.actions {
		display: flex;
		font-family: monospace;
		width: 100%;

		button {
			border: none;
			width: 100%;
			color: var(--color-on-surface);
			background-color: transparent;
			border-radius: 0.5rem;
			display: flex;
			align-items: center;
			padding: 0.615rem;
			cursor: pointer;
			gap: 0.5rem;
			font-size: 0.9rem;
			font-family: inherit;
			justify-content: center;
			white-space: nowrap;

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
		flex-direction: column;
		gap: 0.75rem;

		&-metadata {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;

			&-author {
				display: flex;
				align-items: center;
				gap: 1rem;

				&-username {
					font-weight: 500;
				}
			}

			&-timestamp {
				font-size: 0.9rem;
				margin-left: 0.5rem;
				color: var(--color-on-surface);
			}
		}

		&-text {
			flex: 1;
			font-size: 1.2rem;
			word-break: break-word;
		}
	}

	@media (max-width: 768px) {
		.button-label {
			display: none;
		}
	}
</style>
