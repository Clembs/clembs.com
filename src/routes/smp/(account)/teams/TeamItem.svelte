<script lang="ts">
	import type { minecraftPlayers, minecraftTeams } from '$lib/db/schema';
	import { IconShieldLockFilled } from '@tabler/icons-svelte';
	import type { LanguageSchema } from '../../locales';
	import { colors } from '../_helpers';

	export let strings: LanguageSchema;

	export let onClick: (() => void) | undefined = undefined;

	export let team: Omit<typeof minecraftTeams.$inferSelect, 'passcode'> & {
		passcode: string | undefined | null;
		leader: typeof minecraftPlayers.$inferSelect;
		members: (typeof minecraftPlayers.$inferSelect)[];
	};
</script>

<svelte:element
	this={onClick ? 'button' : 'div'}
	disabled={team.members.length >= 5}
	class="team"
	role="button"
	tabindex={onClick ? 0 : undefined}
	on:click={() => onClick?.()}
>
	<!-- <header> -->
	<div class="icon" style:--color={colors.find(({ name }) => name === team.color)?.hex}>
		{#if team.passcode}
			<div class="locked">
				<IconShieldLockFilled />
			</div>
		{/if}
	</div>
	<div class="text">
		<h4>
			{team.name}
		</h4>
		<span class="subtext">
			{team.members.length}/5 {strings.teams.members}
			{#if team.members.length >= 5}
				• {strings.teams.full}
			{/if}
		</span>
		<ul class="members">
			{#each team.members.sort( (a, b) => (a.uuid === team.leader.uuid ? -1 : a.username.localeCompare(b.username)), ) as member}
				<li class:leader={member.uuid === team.leader.uuid}>
					<img
						src={member.uuid
							? `https://crafatar.com/avatars/${member.uuid}?size=24&overlay`
							: 'https://m.clembs.com/placeholder-image.png'}
						alt={member.username}
					/>
					<span class="username">
						{member.username}
					</span>
				</li>
			{/each}
		</ul>
	</div>
	<!-- </header> -->
</svelte:element>

<style lang="scss">
	.team {
		display: flex;
		gap: 1rem;
		// flex-direction: column;
		text-align: left;
		width: 100%;
		border-radius: 1rem;
		padding: 0.5rem;
		border: 1px solid var(--color-outline);

		// header {
		// 	align-items: center;
		// }

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.text {
			flex: 1;
		}

		h4 {
			font-size: 1.125rem;
		}

		&:is(button):hover {
			background-color: var(--color-surface);
		}

		.icon {
			width: 3rem;
			height: 3rem;
			border-radius: 99rem;
			position: relative;
			background-color: var(--color);
			border: 1px solid var(--color-outline);

			.locked {
				position: absolute;
				bottom: -0.5rem;
				right: -0.25rem;
			}
		}

		.members {
			list-style: none;
			margin: 0;
			padding: 0;
			margin-top: 1rem;
			margin-bottom: 0.5rem;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;

			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				position: relative;
				margin: 0;

				&.leader {
					font-weight: 550;
					&::before {
						content: '👑';
						position: absolute;
						left: -0.25rem;
						top: -0.95rem;
						rotate: -25deg;
					}
				}
			}
		}
	}
</style>
