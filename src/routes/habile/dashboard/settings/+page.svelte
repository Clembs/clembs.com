<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import IconCircleCheck from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheck.svelte';
	import IconAbacus from '@tabler/icons-svelte/dist/svelte/icons/IconAbacus.svelte';
	import IconUnlink from '@tabler/icons-svelte/dist/svelte/icons/IconUnlink.svelte';
	import IconAlertTriangleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertTriangleFilled.svelte';
	import IconInfoCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconInfoCircleFilled.svelte';
	import IconLink from '@tabler/icons-svelte/dist/svelte/icons/IconLink.svelte';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';
	import DiscordLinkModal from './DiscordLinkModal.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import { defaultHabileChatData } from '$lib/db/HabileChatData';

	export let data;

	let conversationSettingsForm: HTMLFormElement;
	let showLinkModal = false;
	let linkLoading = false;
	let linkOtp: number;
</script>

{#if showLinkModal}
	<DiscordLinkModal otp={linkOtp} bind:showModal={showLinkModal} />
{/if}

<section id="settings">
	<h2>Settings</h2>

	<section>
		<h3>Discord profile</h3>

		<p>
			Habile Chat is only available on <a href="/discord">Habile's Lounge</a>, while your Discord
			profile is linked to your clembs.com account.
		</p>

		{#if data.discordData}
			<p class="status">
				<IconCircleCheck />
				<span>
					Your Discord profile (<strong>
						@{data.discordData.username}{data.discordData.discriminator !== '0'
							? `#${data.discordData.discriminator}`
							: ''}</strong
					>) is linked to your clembs.com account. Mention @Habile in any channel to get started.
				</span>
			</p>

			<div class="buttons">
				<form use:enhance action="?/discordUnlink" method="post">
					<Button style="danger" type="submit">
						<IconUnlink />
						Unlink Discord profile
					</Button>
				</form>
				<Button style="outlined" href="/discord">
					<HabileHappy />
					Join Habile's Lounge
				</Button>
			</div>
		{:else}
			<p class="status">
				<IconInfoCircleFilled />
				<span>
					Link your Discord profile to your clembs.com account to use Habile Chat!
					<br />
					Note: no Discord user data is saved on us, besides your Discord ID (to retrieve your clembs.com
					profile from Habile).
				</span>
			</p>

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
		{/if}
	</section>

	<section>
		<h3>Conversations</h3>

		<p>
			The last 10 messages Habile and you exchanged are saved to enable continued conversations.
			<br />
			Past this point, Habile saves key things about you so she remembers you better.
		</p>

		<form
			use:enhance={() =>
				({ result, update }) => {
					if (result.type === 'success') {
						toast.success('Your preferences have been updated.');
					} else {
						toast.error('Something went wrong. Please try again later.');
					}
					update({
						reset: false,
					});
				}}
			action="?/editSettings"
			method="post"
			bind:this={conversationSettingsForm}
		>
			<!-- on:change={() => conversationSettingsForm.submit()} -->
			<Switch
				checked={!(data.userData?.habileChatData || defaultHabileChatData)?.dismissedUsageBanner}
				name="dismissedUsageBanner"
				required={false}
			>
				<IconAbacus />
				Show my usage below Habile's messages
			</Switch>
			<Button type="submit">Update preferences</Button>
		</form>
		<form
			use:enhance={() =>
				({ update, result }) => {
					if (result.type === 'success') {
						toast.success("Habile's knowledge about you has been reset.");
					} else {
						toast.error('Something went wrong. Please try again later.');
					}
					update();
				}}
			method="post"
			action="?/resetKnowledge"
		>
			{#if !data.userData?.habileChatData?.knowledge}
				<p class="status">
					<IconAlertTriangleFilled />
					<span>
						Habile doesn't know anything about you yet. @mention her in Habile's Lounge to chat with
						her!
					</span>
				</p>
			{/if}
			<Button disabled={!data.userData?.habileChatData?.knowledge} style="danger" type="submit">
				<IconAlertTriangleFilled />
				Delete what Habile knows about me
			</Button>
		</form>
	</section>
</section>

<style lang="scss">
	#settings {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin: 1.5rem;

		section {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		.status {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem;
			border-radius: 0.5rem;
			background-color: var(--color-surface);
			border: 1px solid var(--color-outline);

			span {
				flex: 1;
			}
		}

		.buttons {
			display: flex;
			gap: 0.5rem;
			flex-wrap: wrap;
		}
	}
</style>
