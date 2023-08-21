<script lang="ts">
	import { letterColors } from './letterColors';
	import type { User, UserBadge } from '$lib/db/types';
	import { badges } from '$lib/helpers/badges';
	import Modal from '../Modal.svelte';

	export let user: null | User = null;
	export let showBadge = true;
	export let size = '2.25rem';

	let showModal = false;

	$: username = user?.username ?? 'anonymous user';

	$: firstCharUsername = username[0];
	$: lastCharUsername = username.at(-1)!;

	$: avatarGradient = {
		a: letterColors[firstCharUsername] ?? letterColors.a,
		b: letterColors[lastCharUsername] ?? letterColors.z,
	};

	function findMostImportantBadge(badges: Exclude<User['badges'], null>): UserBadge {
		const badgeImportance: UserBadge[] = ['BLOCKED', 'CLEMBS', 'SUPPORTER', 'VERIFIED'];

		const sortedBadges = [...badges].sort(
			(a, b) => badgeImportance.indexOf(a) - badgeImportance.indexOf(b)
		);

		return sortedBadges[0];
	}
</script>

{#if user?.badges && showBadge}
	<Modal bind:showModal>
		<h1 slot="title">About {user.username}'s badges</h1>

		<p />

		<div class="badges">
			{#each user.badges as badgeName}
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
	</Modal>
{/if}

<div
	class="avatar"
	style="--color-a: {avatarGradient.a}; --color-b: {avatarGradient.b}; --size: {size}"
>
	{#if user?.badges && showBadge}
		{@const badge = badges[findMostImportantBadge(user.badges)]}
		<button
			on:click|preventDefault|stopPropagation={() => (showModal = !!user)}
			title={badge.label}
			class="avatar-badge-button"
			style="--background:{badge.background};"
		>
			<svelte:component this={badge.icon} />
		</button>
	{/if}
</div>

<style lang="scss">
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
					font-size: 1.1rem;
					font-weight: 500;
				}
			}

			:global(svg) {
				color: var(--background);
				width: 2.25rem;
				height: 2.25rem;
			}
		}
	}

	.avatar {
		position: relative;
		height: var(--size);
		width: var(--size);
		border-radius: 99rem;
		background: linear-gradient(45deg, var(--color-a), var(--color-b));

		&-badge-button {
			position: absolute;
			border: none;
			padding: 0;
			margin: 0;
			cursor: help;
			background-color: transparent;
			bottom: -0.75rem;
			right: -0.55rem;
			color: var(--background);

			:global(svg) {
				width: 1.315rem;
				height: 1.315rem;
			}
		}
	}
</style>
