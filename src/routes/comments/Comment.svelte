<script lang="ts">
	import type { Comment } from '$lib/db/types';
	import IconArrowBackUp from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconChevronDown from '@tabler/icons-svelte/dist/svelte/icons/IconChevronDown.svelte';
	import IconTrash from '@tabler/icons-svelte/dist/svelte/icons/IconTrash.svelte';
	import { createEventDispatcher } from 'svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { page } from '$app/stores';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import { relativeTimeFormat } from '$lib/helpers/relativeTimeFormat';
	import { slide } from 'svelte/transition';

	export let comment: Comment;
	export let showActions = true;
	export let initialNestingLevel = 0;
	export let childCommentsExpanded = false;

	let nestingLevel = initialNestingLevel;
	let childComments = comment.childComments;
	let loadingComments = false;
	let loadingDelete = false;
	let commentDeleted = false;

	let data = $page.data;

	const dispatch = createEventDispatcher();
	const date = snowflakeToDate(comment.id);

	let username = comment.author?.username ?? 'anonymous user';

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
			toast.error(`Something went wrong while trying to delete this comment.`);
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

{#if !commentDeleted}
	<div
		class="comment-wrapper {showActions ? '' : 'no-hover'}"
		id="comment-{comment.id}"
		class:reply={nestingLevel}
	>
		<div class="comment">
			<GradientAvatar user={comment.author} size={!nestingLevel ? '2.25rem' : '1.5rem'} />
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
				<button class="action-button" on:click={replyComment}>
					<IconArrowBackUp /> Reply
				</button>
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
				{#if data.userData?.id === comment.author?.id || data.userData?.badges?.includes('CLEMBS')}
					<button class="action-button" on:click={deleteComment}>
						{#if loadingDelete}
							<LoaderIcon />
						{:else}
							<IconTrash /> Delete
						{/if}
					</button>
				{/if}
			</div>
		{/if}

		{#if childComments && childCommentsExpanded}
			<div class="child-comments" class:margin-left={nestingLevel < 3} transition:slide>
				{#each childComments as comment}
					<svelte:self {comment} initialNestingLevel={nestingLevel + 1} />
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
	}

	.child-comments {
		margin: 0.5rem 0;
		margin-left: 3rem;
	}

	.actions {
		display: flex;
		margin-left: 2.75rem;
		margin-top: 0.25rem;
		font-family: monospace;
		gap: 0.25rem;

		.action-button {
			border: none;
			color: var(--color-on-surface);
			background-color: transparent;
			border-radius: 0.75rem;
			display: flex;
			align-items: center;
			padding: 0.315rem 0.5rem;
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
		&-text {
			flex: 1;
			word-break: break-word;

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
