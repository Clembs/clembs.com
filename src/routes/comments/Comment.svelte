<script lang="ts">
	import type { Comment } from './+page.server';
	import IconCircleCheckFilled from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheckFilled.svelte';
	import IconHeart from '@tabler/icons-svelte/dist/svelte/icons/IconHeart.svelte';
	import IconHeartFilled from '@tabler/icons-svelte/dist/svelte/icons/IconHeartFilled.svelte';
	import IconMessage from '@tabler/icons-svelte/dist/svelte/icons/IconMessage.svelte';
	import IconShare from '@tabler/icons-svelte/dist/svelte/icons/IconShare.svelte';
	import { letterColors } from './letterColors';
	import { createEventDispatcher } from 'svelte';
	import { useShare } from '$lib/components/useShare';

	const dispatch = createEventDispatcher();

	export let comment: Comment;

	let hasLiked = !!comment.userLikes.find((e) => e.userId === 'clembs') ?? false;
	let likeLoading = false;
	let error: string | undefined = undefined;
	let likes = comment.userLikes?.length ?? 0;

	let username = comment.author?.username ?? 'anonymous user';

	let firstCharUsername = username[0];
	let lastCharUsername = username.at(-1)!;

	let avatarGradient = {
		a: letterColors[firstCharUsername] ?? letterColors.a,
		b: letterColors[lastCharUsername] ?? letterColors.z,
	};

	async function likeComment() {
		likeLoading = true;
		try {
			const req = await fetch(`/comments/api/${comment.id}/like`, {
				method: 'PUT',
			});

			if (req.ok) {
				likes = Number(await req.text());
				likeLoading = false;
				hasLiked = !hasLiked;
				return;
			}

			error = req.status.toString();
		} catch (e) {
			error = String(e);
		}
	}

	async function replyComment() {
		dispatch('reply', comment);
	}
</script>

<div class="comment-wrapper" data-comment-id={comment.id}>
	<div class="comment" on:dblclick={likeComment}>
		<div
			class="comment-author-avatar"
			style="--color-a: {avatarGradient.a}; --color-b: {avatarGradient.b};"
		>
			{#if comment.author}
				<div class="comment-author-avatar-verified">
					<IconCircleCheckFilled />
				</div>
			{/if}
		</div>
		<div class="comment-text">
			<div class="comment-text-author">
				<span class="comment-text-author-username">
					{username}
				</span>
			</div>
			<div class="comment-text-content">
				{comment.content}
			</div>
		</div>
	</div>

	<div class="actions">
		<button data-action="like" data-liked={hasLiked} on:click={likeComment}>
			{#if likeLoading}
				Loading...
			{:else}
				{#if hasLiked}
					<IconHeartFilled />
				{:else}
					<IconHeart />
				{/if}

				{likes}
			{/if}
		</button>
		<button data-action="comment" on:click={replyComment}>
			<IconMessage />
			{comment.childComments?.length}
		</button>
		<button
			data-action="share"
			on:click={() => useShare(`https://clembs.com/comments/${comment.id}`)}
		>
			<IconShare />
		</button>
	</div>
</div>

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 1rem;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
		margin-left: 1.75rem;

		button {
			border: none;
			color: var(--color-on-surface);
			background-color: var(--color-background);
			font-family: inherit;
			border-radius: 0.5rem;
			display: flex;
			align-items: center;
			padding: 0.315rem 0.5rem;
			cursor: pointer;
			gap: 0.25rem;
			font-size: 0.9rem;

			&:hover {
				background-color: var(--color-surface);
			}

			&[data-liked='true'] {
				color: var(--color-on-background);
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
		gap: 0.75rem;

		&-author-avatar {
			position: relative;
			top: 0.25rem;
			height: 1.5rem;
			width: 1.5rem;
			border-radius: 99rem;
			background: linear-gradient(45deg, var(--color-a), var(--color-b));

			&-verified {
				position: absolute;
				top: 0.75rem;
				left: 0.85rem;

				:global(svg) {
					width: 20px;
					height: 20px;
				}
			}
		}

		&-text {
			flex: 1;

			&-author {
				display: flex;
				gap: 0.25rem;
				padding-bottom: 0.25rem;
				font-size: 0.9rem;
				align-items: center;
				font-weight: 500;
				border-radius: 1.5rem;
			}
		}
	}
</style>
