<script lang="ts">
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { badges } from '$lib/helpers/badges';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { rankBadges } from '$lib/helpers/rankBadges';
	import type { Comment } from '$lib/db/types';
	import { snowflakeToDate } from '$lib/helpers/snowflake';

	export let comment: Comment;

	const date = snowflakeToDate(comment.id);

	let username = comment.author?.username ?? 'Guest';
</script>

<header>
	<div class="author">
		<GradientAvatar user={comment.author} size="2rem" />
		<div class="author-text">
			{username}
			{#if comment?.author?.badges}
				{@const highestBadge = badges[rankBadges(comment.author.badges)?.[0]]}
				{#if highestBadge}
					<span class="author-badge" style:--badge-color={highestBadge.color}>
						{highestBadge.label}
					</span>
				{/if}
			{/if}
		</div>
	</div>

	<time datetime={date.toISOString()} class="subtext">
		{dateFormat(date)}
	</time>
	<!-- {#if comment.isPinned}
    <span class="subtext comment-metadata-pinned">
      <IconHeartFilled />
    </span>
  {/if} -->
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.author {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			.author-text {
				display: flex;
				flex-direction: column;

				font-weight: 600;
				color: var(--color-on-background);
			}

			.author-badge {
				font-size: 0.75rem;
				color: var(--badge-color);
				font-weight: 500;
			}
		}

		// &-pinned {
		// 	background-color: var(--color-error);
		// 	color: var(--color-on-error);
		// 	font-weight: 500;
		// 	display: grid;
		// 	padding: 0.25rem;
		// 	border-radius: 9rem;

		// 	:global(svg) {
		// 		width: 1rem;
		// 		height: 1rem;
		// 	}
		// }
	}
</style>
