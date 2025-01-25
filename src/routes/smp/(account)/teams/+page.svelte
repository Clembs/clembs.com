<script lang="ts">
	import { languages } from '../../locales';
	import Button from '$lib/components/Button.svelte';
	import TeamItem from './TeamItem.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';

	let { data, form } = $props();

	let strings = $derived(languages[data.language]);

	let showModal = $state(false);

	let currentTeam: (typeof data.teams)[number] = $state();
</script>

{#if currentTeam}
	<Modal bind:showModal>
		{#snippet title()}
				<h2 >
				{strings.teams.modalJoin.title.replace('{name}', currentTeam.name)}
			</h2>
			{/snippet}

		{#if currentTeam.passcode}
			<p class="subtext">
				{strings.teams.modalJoin.locked.description}
			</p>
		{/if}
		<form use:enhance id="join-team-form" method="post">
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
	</Modal>
{/if}

<div class="teams-hub">
	<header>
		<div class="text">
			<h2>{strings.teams.title}</h2>
			<p class="subtext">{strings.teams.description}</p>
		</div>

		<Button href="/smp/teams/create">
			{strings.register.team.submitButton}
		</Button>
	</header>

	<section>
		<h3>{strings.teams.joinTeam}</h3>

		<ul class="teams">
			{#each data.teams as team}
				<li>
					<TeamItem
						on:click={() => {
							currentTeam = team;
							showModal = true;
						}}
						{team}
						{strings}
					/>
				</li>
			{/each}
		</ul>
	</section>
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

		section h3 {
			margin-bottom: 1rem;
		}
	}
</style>
