<script lang="ts">
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { badges } from '$lib/helpers/badges';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import type { Comment, User, UserBadge } from '$lib/db/types';
	import { snowflakeToDate } from '$lib/helpers/snowflake';

	export let comment: Comment;

	const date = snowflakeToDate(comment.id);

	let username = comment.author?.username ?? 'Guest';

	function rankBadges(badges: Exclude<User['badges'], null>): UserBadge[] {
		const badgeImportance: UserBadge[] = ['BLOCKED', 'CLEMBS', 'SUPPORTER'];

		const sortedBadges = [...badges]
			.filter((badge) => badgeImportance.includes(badge))
			.sort((a, b) => badgeImportance.indexOf(a) - badgeImportance.indexOf(b));

		return sortedBadges;
	}
</script>

<header>
	<div class="author">
		<GradientAvatar user={comment.author} size="2rem" />
		<div class="author-text">
			<div class="username">
				{username}
			</div>
			<div class="author-text-below">
				{#if comment?.author?.badges}
					{@const highestBadge = badges[rankBadges(comment.author.badges)?.[0]]}
					{#if highestBadge}
						<span class="author-badge" style:--badge-color={highestBadge.color}>
							{highestBadge.label}
						</span>
						•
					{/if}
				{/if}
				<time datetime={date.toISOString()}>
					{dateFormat(date)}
				</time>
			</div>
		</div>
	</div>
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
