<script lang="ts">
	import { enhance } from '$app/forms';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { PageServerData } from './$types';
	import IconChevronRight from '@tabler/icons-svelte/dist/svelte/icons/IconChevronRight.svelte';
	import DiscordLinkModal from './DiscordLinkModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { LoaderIcon } from 'svelte-french-toast';
	import IconLink from '@tabler/icons-svelte/dist/svelte/icons/IconLink.svelte';

	export let data: PageServerData;
	let showLinkModal = false;
	let linkLoading = false;
	let linkOtp: number;
</script>

{#if showLinkModal}
	<DiscordLinkModal otp={linkOtp} bind:showModal={showLinkModal} />
{/if}

{#if !data.discordData}
	<InfoBox type="danger">
		<span slot="title"> You don't have a Discord profile linked! </span>

		To use Habile Chat, you need to link your Discord profile to your clembs.com account.

		<div slot="actions">
			<form
				use:enhance={() => {
					linkLoading = true;
					return async ({ result, update }) => {
						if (result.type === 'success' && result.data?.otp) {
							showLinkModal = true;
							linkOtp = result.data.otp;
						}

						linkLoading = false;
						await update();
					};
				}}
				action="?/createLinkOtp"
				method="post"
			>
				<Button type="submit">
					{#if linkLoading}
						<LoaderIcon />
					{:else}
						<IconLink />
						Link Discord profile
					{/if}
				</Button>
			</form>
		</div>
	</InfoBox>
{/if}
<header>
	<h1>Habile Chat <IconChevronRight /> Dashboard</h1>

	{#if data.discordData}
		<Tooltip>
			<span slot="tooltip-content"> Go to Settings </span>
			<a href="#settings" class="discord-profile">
				<img
					src="https://cdn.discordapp.com/avatars/{data.discordData.id}/{data.discordData
						.avatar}.webp?size=32"
					height={32}
					width={32}
					class="avatar"
					alt="{data.discordData.username}'s profile picture"
				/>
				{data.discordData.username}
			</a>
		</Tooltip>
	{:else}
		<form
			use:enhance={() => {
				linkLoading = true;
				return async ({ result, update }) => {
					if (result.type === 'success' && result.data?.otp) {
						showLinkModal = true;
						linkOtp = result.data.otp;
					}

					linkLoading = false;
					await update();
				};
			}}
			action="?/createLinkOtp"
			method="post"
		>
			<button type="submit" class="discord-profile">
				{#if linkLoading}
					<LoaderIcon />
				{:else}
					Link your Discord profile
				{/if}
			</button>
		</form>
	{/if}
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: space-between;

		h1 {
			flex: 1;
		}

		.discord-profile {
			display: flex;
			align-items: center;
			border: 1px solid var(--color-outline);
			gap: 0.5rem;
			border-radius: 99rem;
			padding: 0.5rem 0.75rem 0.5rem 0.5rem;
			text-decoration: none;

			.avatar {
				display: inline-block;
				border-radius: 50%;
				border: 1px solid var(--color-outline);
			}

			&:hover {
				background-color: var(--color-surface);
			}
		}
	}
</style>
