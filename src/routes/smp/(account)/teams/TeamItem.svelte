<script lang="ts">
	import type { minecraftPlayers, minecraftTeams } from '$lib/db/schema';
	import { IconShieldLockFilled } from '@tabler/icons-svelte';
	import type { LanguageSchema } from '../../locales';
	import { colors } from '../_helpers';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { marked } from 'marked';
	import insane from 'insane';

	export let strings: LanguageSchema;

	export let team: Omit<typeof minecraftTeams.$inferSelect, 'passcode'> & {
		passcode: string | undefined | null;
		leader: typeof minecraftPlayers.$inferSelect;
		members: (typeof minecraftPlayers.$inferSelect)[];
	};
</script>

<button
	on:click
	disabled={team.members.length >= 7}
	class="team"
	style:--color={colors.find(({ name }) => name === team.color)?.hex}
>
	<div class="left-stuff" class:no-description={!team.description}>
		<div class="icon">
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
			{#if team.description}
				<p>{@html insane(marked(team.description))}</p>
			{/if}
		</div>
	</div>
	<div class="right-stuff">
		<ul class="members">
			{#each team.members.sort( (a, b) => (a.uuid === team.leader.uuid ? -1 : a.username.localeCompare(b.username)), ) as member}
				<li class:leader={member.username === team.leader.username}>
					<Tooltip>
						<img
							src={member.uuid
								? `https://crafatar.com/avatars/${member.uuid}?size=24&overlay`
								: 'https://m.clembs.com/placeholder-image.png'}
							alt={member.username}
						/>
						<span slot="tooltip-content">
							{member.username}
							{#if member.uuid === team.leader.uuid}
								({strings.teams.leader})
							{/if}
						</span>
					</Tooltip>
				</li>
			{/each}
		</ul>
		<span class="subtext">
			{team.members.length}/7 {strings.teams.members}
			{#if team.members.length >= 7}
				• {strings.teams.full}
			{/if}
		</span>
	</div>
</button>

<style lang="scss">
	.team {
		.left-stuff {
			display: flex;
			gap: 1rem;

			&.no-description {
				align-items: center;
			}
		}

		.right-stuff {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}

		display: flex;
		justify-content: space-between;
		// align-items: center;
		// flex-direction: column;
		text-align: left;
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-outline);

		&:first-child {
			border-radius: 1rem 1rem 0 0;
		}

		&:last-child {
			border-radius: 0 0 1rem 1rem;
		}

		&:first-child:last-child {
			border-radius: 1rem;
		}

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

		&:not(:disabled):hover {
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
			display: flex;

			li {
				position: relative;
				display: grid;
				margin: 0;
				border: 3px solid white;
				transition: margin 200ms ease-out;

				&:not(:first-child) {
					margin-left: -0.5rem;
				}

				&:not(:last-child):hover {
					margin-right: 0.5rem;
				}

				img {
					height: 2rem;
					width: 2rem;
				}

				&.leader {
					&::before {
						content: '👑';
						position: absolute;
						left: -0.25rem;
						top: -0.95rem;
						rotate: -25deg;
						z-index: 2;
					}
				}
			}
		}
	}
</style>
