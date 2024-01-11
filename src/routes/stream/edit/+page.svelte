<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { SocialName, socials, streamSocials } from '$lib/data/socials';
	import Discord from '$lib/icons/socials/discord.svelte';
	import { IconX } from '@tabler/icons-svelte';
	import type { PageServerData } from './$types';
	import Stream from '../Stream.svelte';

	export let data: PageServerData;

	$: currentStream = data.streams.find(
		(stream) => stream.state === 'DEFAULT' && stream.startedAt.getTime() < Date.now()
	);

	let checkedPlatforms: Record<string, boolean> = {
		[SocialName.YouTube]: false,
		[SocialName.Twitch]: false,
	};
	let discordEvent = true;
	let createStream = false;
</script>

<div class="manager">
	<h1>
		{#if currentStream}
			🔴 You're streaming!
		{:else}
			Super secret stream manager
		{/if}
	</h1>

	{#if currentStream}
		<h2>{currentStream.title}</h2>
	{/if}

	{#if !createStream || currentStream}
		<div class="main-buttons">
			{#if currentStream}
				<form method="POST" use:enhance action="?/updateStreamState">
					<input type="hidden" name="streamId" value={currentStream.id} />
					<input type="hidden" name="newState" value="ENDED" />
					<Button type="submit" style="danger">End current stream</Button>
				</form>
			{/if}
			<Button on:click={() => (createStream = true)}>Create new stream</Button>
		</div>
	{:else}
		<form id="create-stream" method="POST" use:enhance action="?/createStream">
			<header>
				<Button type="button" style="text" size="sm" on:click={() => (createStream = false)}>
					<IconX />
				</Button>

				<h2>Create a new stream</h2>
			</header>

			<TextInput label="Title" name="title" required autofocus />
			<label for="platforms">Platforms</label>

			<section id="platforms">
				{#each streamSocials as social}
					<div class="platform" aria-selected={checkedPlatforms[social.id]}>
						<label>
							<div class="platform-details">
								<svelte:component this={social.icon} />
								{social.name}
							</div>
							<input
								type="checkbox"
								name="platforms"
								bind:checked={checkedPlatforms[social.id]}
								value={checkedPlatforms[social.id] ? social.id : ''}
							/>
						</label>
						{#if checkedPlatforms[social.id]}
							<TextInput
								label="URL"
								name="{social.id}:url"
								value={socials.find((s) => s.id === social.id)?.url}
							/>
						{/if}
					</div>
				{/each}
			</section>

			<label for="startTime">
				Start time

				<input
					type="datetime-local"
					name="startTime"
					required
					value={new Date().toISOString().slice(0, -8)}
				/>
			</label>

			<Switch name="discordEvent" bind:checked={discordEvent} required={false}>
				<Discord />
				Create Discord event
			</Switch>
			{#if discordEvent}
				<TextInput label="Discord event description" name="description" required={false} />

				<label for="startTime">
					End time

					<input
						type="datetime-local"
						name="endTime"
						required
						value={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, -8)}
					/>
				</label>
			{/if}

			<div class="buttons">
				<Button type="submit">Create stream</Button>
			</div>
		</form>
	{/if}

	{#if data.streams?.filter((s) => s.startedAt.getTime() > Date.now()).length}
		<section id="streams">
			<h2>Upcoming streams</h2>
			{#each data.streams?.filter((s) => s.startedAt.getTime() > Date.now()) as stream}
				<Stream {stream} userData={data.userData} />
			{/each}
		</section>
	{/if}

	<section id="streams">
		<h2>Previous streams</h2>
		{#each data.streams?.filter((s) => s.state !== 'DEFAULT' && s.startedAt.getTime() < Date.now()) as stream}
			<Stream {stream} userData={data.userData} />
		{/each}
	</section>
</div>

<style lang="scss">
	.manager {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.main-buttons {
		width: 100%;
		display: flex;
		border: 1px solid var(--color-outline);
		border-radius: 9rem;
		gap: 0.5rem;
		padding: 0.5rem;
		background-color: var(--color-surface);
	}

	#create-stream {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid var(--color-outline);
		border-radius: 1rem;
		padding: 1rem;
		background-color: var(--color-surface);
		color: var(--color-on-surface);

		header {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		:global(svg) {
			height: 1.5rem;
			width: 1.5rem;
		}

		.buttons {
			display: flex;
			gap: 0.5rem;
			align-self: end;
		}

		#platforms {
			.platform {
				cursor: pointer;
				border-radius: 1rem;
				padding: 0.5rem 0.75rem;
				margin-bottom: 0.25rem;
				border: 1px solid var(--color-outline);
				color: var(--color-on-background);

				&:hover {
					background-color: var(--color-surface-variant);
				}

				&[aria-selected='true'] {
					background-color: var(--color-on-background);
					color: var(--color-background);
				}

				label {
					display: flex;
					cursor: pointer;
					align-items: center;
					justify-content: space-between;
					gap: 0.5rem;

					input {
						accent-color: var(--color-background);
						width: 1.5rem;
						height: 1.5rem;
					}

					.platform-details {
						display: flex;
						align-items: center;
						gap: 0.5rem;
					}
				}
			}
		}

		label[for='startTime'] {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			font-size: 1rem;
		}
	}

	#streams {
		display: flex;
		flex-direction: column;

		h2 {
			margin-bottom: 1rem;
		}
	}
</style>
