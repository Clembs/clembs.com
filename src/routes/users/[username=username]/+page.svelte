<script lang="ts">
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { badges } from '$lib/helpers/badges';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { rankBadges } from '$lib/helpers/rankBadges';
	import Comments from '../../comments/Comments.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main>
	<header class="user-info">
		<GradientAvatar user={data.user} showBadge={false} size="5rem" />
		<div class="user-info-name">
			{data.user.username}

			{#if data.user.badges?.length}
				<span class="badges">
					{#each rankBadges(data.user.badges) as badgeName}
						{@const badge = badges[badgeName]}
						<Tooltip>
							<span class="badge" style="--background:{badge.background};">
								<svelte:component this={badge.icon} />
							</span>

							<span class="tooltip-content" slot="tooltip-content">
								<div class="label">
									{badge.label}
								</div>
								<div class="description">
									{badge.description}
								</div>
							</span>
						</Tooltip>
					{/each}
				</span>
			{/if}
		</div>

		<span>
			Joined on <time
				class="user-info-created"
				datetime={new Date(data.user.createdAt).toDateString()}
			>
				{dateFormat(new Date(data.user.createdAt))}
			</time>
		</span>
	</header>

	<Comments comments={data.user.comments} userData={data.userData} />
</main>

<style lang="scss">
	.user-info {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		margin: 2rem 1rem;

		&-name {
			font-size: 2rem;
			font-weight: 500;
		}

		&-created {
			font-weight: 500;
		}

		.badges {
			display: inline-flex;
			gap: 0.25rem;
			font-weight: 400;
			font-size: 1rem;

			.badge {
				display: flex;
				flex-direction: column;
				align-items: center;

				:global(svg) {
					color: var(--background);
					width: 1.5rem;
					height: 1.5rem;
				}
			}

			.label {
				font-size: 1rem;
				font-weight: 500;
			}

			.description {
				font-size: 0.9rem;
				color: var(--color-on-surface);
			}
		}
	}
</style>
