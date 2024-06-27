<script lang="ts">
	import { languages } from '../../locales';
	import Button from '$lib/components/Button.svelte';
	import { colors } from '../_helpers';
	import { IconShieldLockFilled } from '@tabler/icons-svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { enhance } from '$app/forms';
	import InfoBox from '$lib/components/InfoBox.svelte';

	export let form;
	export let data;
	$: strings = languages[data.language];
	let success = false;

	let showModal = false;
	let currentTeam: (typeof data.teams)[number];
</script>

{#if currentTeam}
	<Modal bind:showModal>
		<h2 slot="title">
			{#if success}
				{strings.teams.modalSuccess.title.replace('{name}', currentTeam.name)}
			{:else}
				{strings.teams.modalJoin.title.replace('{name}', currentTeam.name)}
			{/if}
		</h2>

		{#if !success}
			{#if currentTeam.passcode}
				<p class="subtext">
					{strings.teams.modalJoin.locked.description}
				</p>
			{/if}
			<form
				use:enhance={() =>
					async ({ result, update }) => {
						if (result.type === 'success') {
							success = true;
						}
						await update();
					}}
				id="join-team-form"
				method="post"
			>
				<input type="hidden" name="team-id" value={currentTeam.id} />
				{#if currentTeam.passcode}
					<TextInput
						name="passcode"
						label={strings.teams.modalJoin.locked.inputLabel}
						maxlength={6}
						minlength={6}
						type="number"
					/>
				{/if}

				{#if form?.message}
					<InfoBox type="danger">
						{form.message}
					</InfoBox>
				{/if}

				<Button type="submit">
					{strings.teams.modalJoin.locked.joinButton}
				</Button>
			</form>
		{:else}
			<p class="subtext">
				{strings.teams.modalSuccess.description}
			</p>
		{/if}
	</Modal>
{/if}

<div class="teams-hub">
	<header>
		<div class="text">
			<h2>{strings.teams.title}</h2>
			<p class="subtext">{strings.teams.description}</p>
		</div>

		{#if !data.currentTeam}
			<Button href="/smp/teams/create">
				{strings.register.team.submitButton}
			</Button>
		{/if}
	</header>

	{#if !data.currentTeam}
		<section>
			<h3>{strings.teams.joinTeam}</h3>

			<ul class="teams">
				{#each data.teams as team}
					<li>
						<button
							disabled={team.members.length >= 5}
							class="team"
							on:click={() => {
								currentTeam = team;
								showModal = true;
							}}
						>
							<div class="icon" style:--color={colors.find(({ name }) => name === team.color)?.hex}>
								{#if team.passcode}
									<div class="locked">
										<IconShieldLockFilled />
									</div>
								{/if}
							</div>
							<div class="text">
								<h4>{team.name}</h4>
								<p class="subtext">
									{strings.teams.teamLeader.replace('{leader}', team.leader.username)}
									• {team.members.length}/5 {strings.teams.members}
									{#if team.members.length >= 5}
										• {strings.teams.full}
									{/if}
								</p>
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<section>
			<h3>Your current team</h3>

			<div class="team">
				<div
					class="icon"
					style:--color={colors.find(({ name }) => name === data.currentTeam?.color)?.hex}
				>
					{#if data.currentTeam.passcode}
						<div class="locked">
							<IconShieldLockFilled />
						</div>
					{/if}
				</div>
				<div class="text">
					<h4>{data.currentTeam.name}</h4>
					<p class="subtext">
						{strings.teams.teamLeader.replace('{leader}', data.currentTeam.leader.username)}
						• {data.currentTeam.members.length}/5 {strings.teams.members}
						{#if data.currentTeam.members.length >= 5}
							• {strings.teams.full}
						{/if}
					</p>
				</div>
			</div>
		</section>
	{/if}
</div>

<style lang="scss">
	#join-team-form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
		align-items: flex-end;
	}

	.teams-hub {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		header {
			display: flex;
			justify-content: space-between;
			gap: 2rem;

			.text {
				flex: 1;
			}
		}

		.teams {
			padding: 0;
			list-style: none;
			margin: 0;
		}

		.team {
			display: flex;
			text-align: left;
			gap: 1rem;
			align-items: center;
			width: 100%;
			border-radius: 1rem;
			padding: 0.5rem;
			border: 1px solid var(--color-outline);

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
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
		}

		section h3 {
			margin-bottom: 1rem;
		}
	}
</style>
