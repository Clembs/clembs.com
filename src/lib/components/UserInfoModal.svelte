<script lang="ts">
	import type { User } from '$lib/db/types';
	import { badges } from '$lib/helpers/badges';
	import GradientAvatar from './GradientAvatar/GradientAvatar.svelte';
	import Modal from './Modal.svelte';
	export let showModal = false;

	export let userData: User;
</script>

<Modal bind:showModal>
	<header slot="title" class="user-info">
		<GradientAvatar user={userData} showBadge={false} size="4rem" />
		<div class="user-info-name">
			{userData?.username ?? 'anonymous user'}
		</div>

		{#if userData}
			<span>
				Joined on <time class="user-info-created" datetime={userData.createdAt.toDateString()}>
					{userData.createdAt.toLocaleString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric',
						hour: '2-digit',
						hour12: false,
						minute: '2-digit',
					})}
				</time>
			</span>
			<code>{userData.id}</code>
		{:else}
			This comment has been sent by a user who hasn't logged in.
		{/if}
	</header>

	{#if userData?.badges}
		<section class="badges-section">
			<h2>Badges</h2>

			<p>
				These badges are either manually given by Clembs or automatically by self-verification, and
				are used to show a user's status.
			</p>

			<div class="badges">
				{#each userData.badges as badgeName}
					{@const badge = badges[badgeName]}
					<div class="badge" style="--background:{badge.background};">
						<svelte:component this={badge.icon} />
						<div class="badge-info">
							<div class="badge-info-label">
								{badge.label}
							</div>
							<span class="badge-info-description">
								{badge.description}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</Modal>

<style lang="scss">
	.user-info {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1rem;

		&-name {
			font-size: 2rem;
			font-weight: 500;
		}

		&-created {
			font-weight: 500;
		}
	}

	.badges-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-outline);
	}

	.badges {
		display: flex;
		flex-direction: column;
		margin: 0.5rem 0;
		gap: 1rem;

		.badge {
			display: flex;
			gap: 0.5rem;

			&-info {
				&-label {
					font-size: 1rem;
					font-weight: 500;
				}
				&-description {
					font-size: 0.9rem;
					color: var(--color-on-surface);
				}
			}

			:global(svg) {
				color: var(--background);
				width: 2.25rem;
				height: 2.25rem;
			}
		}
	}
</style>
