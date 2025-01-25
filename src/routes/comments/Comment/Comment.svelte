<script lang="ts">
	import type { LegacyComment } from '$lib/db/types';
	import VoteButtons from './VoteButtons.svelte';
	import '../../../styles/comment.scss';
	import { parseEmojis } from './parseMentions';
	import Emoji from '$lib/components/Emoji.svelte';
	import GradientAvatar from './GradientAvatar.svelte';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { badges } from './badges';

	export let comment: LegacyComment;
</script>

<article
	class="comment-wrapper {!!comment.parent_id ? 'reply' : 'parent'}"
	data-comment-id={comment.id}
>
	<div class="comment">
		<div class="author">
			<GradientAvatar user={comment.author} size="2rem" />
			<div class="author-text">
				<div class="username">
					{comment.author.username}
				</div>
				<div class="author-text-below">
					{#if comment?.author?.badges}
						{@const highestBadge = badges[comment.author.badges[0]]}
						{#if highestBadge}
							<span class="author-badge" style:--badge-color={highestBadge.color}>
								{highestBadge.label}
							</span>
							•
						{/if}
					{/if}
					<time datetime={comment.created_at}>
						{dateFormat(new Date(comment.created_at))}
					</time>
				</div>
			</div>
		</div>

		<div class="comment-content">
			{#each parseEmojis(comment.content) as part}
				{#if typeof part === 'string'}
					{part}
				{:else if part.type === 'emoji'}
					<Emoji name={part.emojiId} src="/assets/emotes/{part.emojiId}.webp" />
				{/if}
			{/each}
		</div>

		<div class="comment-actions">
			<VoteButtons {comment} />
		</div>
	</div>

	{#if comment.child_comments.length > 0}
		<div class="child-comments">
			<ul>
				{#each comment.child_comments as c (c.id)}
					<svelte:self comment={c} />
				{/each}
			</ul>
		</div>
	{/if}
</article>

<style lang="scss">
	.comment-wrapper {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		position: relative;

		&.parent {
			overflow-x: scroll;
			
			// remove scrollbars
			overflow: -moz-scrollbars-none;
			-ms-overflow-style: none;
			scrollbar-width: none;
			
			&::-webkit-scrollbar {
				display: none;
			}

			margin: 0 -1rem;

			.comment {
				padding: 0.5rem 1rem;
			}

			.child-comments {
				padding-right: 1rem;
			}
		}

		&.reply {
			padding-left: 1rem;
			border-left: 1px solid var(--color-outline);
		}
	}

	.comment {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		position: relative;
		padding: 0.5rem 0;
		z-index: 2;

		font-weight: inherit;
		text-decoration: none;


		.author {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			.author-text {
				display: flex;
				flex-direction: column;

				.username {
					font-weight: 600;
					color: var(--color-on-background);
				}

				.author-text-below {
					font-size: 0.75rem;

					.author-badge {
						color: var(--badge-color);
						font-weight: 500;
					}

					time {
						color: var(--color-on-surface);
					}
				}
			}
		}

		.comment-content {
			font-size: 17px;
			margin-left: 2.5rem;
			margin-top: -0.5rem;
			word-break: break-word;
			min-width: 30ch;
		}

		.comment-actions {
			display: flex;
			gap: 0.25rem;
			margin-left: 2.25rem;
		}
	}

	.child-comments {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: 3.25rem;
		padding-top: 0.5rem;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
		}
	}
</style>
