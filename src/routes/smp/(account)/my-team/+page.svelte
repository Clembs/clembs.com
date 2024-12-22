<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { languages } from '../../locales/index.js';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { IconLogout } from '@tabler/icons-svelte';
	import { enhance } from '$app/forms';

	export let data;

	let showLeaveModal = false;

	$: strings = languages[data.language];
</script>

<Modal bind:showModal={showLeaveModal}>
	<h2 slot="title">
		{strings.teams.modalLeave.title}
	</h2>

	<p class="subtext">
		{@html strings.teams.modalLeave.description}
	</p>

	<div slot="buttons">
		<form use:enhance action="?/leave" method="post">
			<Button type="submit">
				{strings.teams.modalLeave.leaveButton}
			</Button>
		</form>
	</div>
</Modal>

{#if data.newMember}
	<Modal showModal={true}>
		<h2 slot="title">
			{strings.teams.modalSuccess.title.replace('{name}', data.team.name)}
		</h2>

		<p class="subtext">
			{strings.teams.modalSuccess.description}
		</p>
	</Modal>
{/if}

<div id="stuff">
	<header>
		<h1>{data.team.name}</h1>

		{#if !data.isLeader}
			<Tooltip>
				<Button on:click={() => (showLeaveModal = true)} icon>
					<IconLogout />
				</Button>
				<span slot="tooltip-content"> {strings.teams.modalLeave.leaveButton} </span>
			</Tooltip>
		{/if}
	</header>

	<section>
		<h2>{strings.teams.currentTeam.description}</h2>
		{#if data.team.description}
			<p>{data.team.description}</p>
		{:else}
			<p>
				<i>{strings.teams.currentTeam.noDescription}</i>
			</p>
		{/if}
	</section>

	<section>
		<h2>{strings.teams.currentTeam.members}</h2>

		<ul class="members">
			{#each data.team.members.sort( (a, b) => (a.username === data.team.leader.username ? -1 : a.username.localeCompare(b.username)), ) as member}
				<li>
					<img
						height={32}
						width={32}
						src={member.uuid
							? `https://crafatar.com/avatars/${member.uuid}?size=32&overlay`
							: 'https://m.clembs.com/placeholder-image.png'}
						alt={member.username}
					/>
					{member.username}
					{#if member.uuid === data.team.leader.uuid}
						({strings.teams.leader})
					{/if}
				</li>
			{/each}
		</ul>
	</section>
</div>

<style lang="scss">
	#stuff {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.members {
			margin: 0;
			padding: 0;
			margin-top: 0.5rem;

			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}
	}
</style>
