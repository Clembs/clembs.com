<script lang="ts">
	import type { User } from '$lib/db/types';
	import { badges } from '$lib/helpers/badges';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { rankBadges } from '$lib/helpers/rankBadges';
	import GradientAvatar from './GradientAvatar/GradientAvatar.svelte';
	import Modal from './Modal.svelte';
	import Tooltip from './Tooltip.svelte';
	export let showModal = false;

	export let userData: User;
</script>

<Modal bind:showModal>
	<header slot="title" class="user-info">
		<GradientAvatar user={userData} showBadge={false} size="4rem" />
		<div class="user-info-name">
			{userData?.username ?? 'anonymous'}
			{#if userData?.badges}
				<span class="badges">
					{#each rankBadges(userData.badges) as badgeName}
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

		{#if userData}
			<span>
				Joined on <time class="user-info-created" datetime={userData.createdAt.toDateString()}>
					{dateFormat(userData.createdAt)}
				</time>
			</span>
		{:else}
			This comment has been sent by a user who hasn't logged in.
		{/if}
	</header>
</Modal>

<style lang="scss">
	.user-info {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;

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
