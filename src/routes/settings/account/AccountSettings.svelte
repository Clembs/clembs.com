<script lang="ts">
	import { page } from '$app/stores';
	import LoginForm from '$lib/components/Settings/LoginForm.svelte';
	import { enhance } from '$app/forms';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import SettingsSection from '../SettingsSection.svelte';
	import IconAlertTriangleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertTriangleFilled.svelte';
	import IconLogout from '@tabler/icons-svelte/dist/svelte/icons/IconLogout.svelte';
	import IconTrash from '@tabler/icons-svelte/dist/svelte/icons/IconTrash.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import DeleteAccountModal from './DeleteAccountModal.svelte';
	import Passkey from '$lib/svg/Passkey.svelte';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	let usernameChangeLoading = false;
	let notificationsLoading = false;
	let signOutLoading = false;
	let error = '';
	let username = data?.userData?.username;
	let emailAllReplies = data?.userData?.preferences?.email?.allReplies;
	let showDeleteModal = false;

	let canUsePasskeys = false;
	let passkeyUseLoading = true;

	onMount(async () => {
		const { browserSupportsWebAuthn } = await import('@simplewebauthn/browser');
		canUsePasskeys = browserSupportsWebAuthn();
		passkeyUseLoading = false;
	});
</script>

{#if data?.userData}
	<DeleteAccountModal bind:showDeleteModal />

	<SettingsSection>
		<h2>Profile</h2>

		<form
			class="edit-profile"
			use:enhance={() => {
				usernameChangeLoading = true;
				return async ({ result, update }) => {
					usernameChangeLoading = false;

					if (result.type === 'failure') {
						error = result.data?.message;
						return;
					}
					if (result.type === 'error') {
						error = result.error;
						return;
					}

					error = '';
					await update();
					toast.success('Username changed successfully!');
				};
			}}
			method="POST"
			action="/account?/changeUsername"
		>
			<div class="settings-item">
				<h3>Username</h3>

				<p class="description">
					Your username needs to be 2 to 32 characters long, and can only contain roman letters,
					numbers and some special characters.
				</p>

				<TextInput bind:value={username} minlength={2} maxlength={32} name="username" />

				{#if error}
					<InfoBox type="danger">
						{error}
					</InfoBox>
				{/if}

				<Button
					disabled={usernameChangeLoading ||
						username === $page.data?.userData?.username ||
						!username}
					type="submit"
				>
					{#if usernameChangeLoading}
						<LoaderIcon />
					{:else}
						Update profile
					{/if}
				</Button>
			</div>

			<div class="settings-item">
				<h3>Avatar</h3>

				<p class="description">
					Your avatar is generated based on the first and last characters of your username. Change
					it and see the colors change!
				</p>

				<GradientAvatar
					size="5rem"
					user={{
						...$page.data?.userData,
						username: username || 'Guest',
					}}
					showBadge={false}
				/>
			</div>
		</form>
	</SettingsSection>

	<SettingsSection>
		<form
			method="POST"
			action="/settings?/updateEmailSettings"
			use:enhance={() => {
				notificationsLoading = true;
				return async ({ result, update }) => {
					notificationsLoading = false;
					if (result.type === 'success') {
						toast.success('Settings updated successfully!');
					}
					if (result.type === 'failure') {
						toast.error(result.data?.message);
					}
					if (result.type === 'error') {
						toast.error(result.error?.message);
					}
					await update();
				};
			}}
		>
			<h2>Email notifications</h2>

			<p>You can choose to receive emails for specific events within the site.</p>

			<!-- {#if $settingsStore} -->
			<!-- <input type="hidden" name="preferences" value={JSON.stringify($settingsStore)} /> -->

			<div class="switches">
				<Switch required={false} name="allReplies" bind:checked={emailAllReplies}>
					When anyone replies to my comments
				</Switch>

				<Switch required={false} name="clembsReplies" disabled={emailAllReplies}>
					When Clembs replies to my comments
				</Switch>

				<Switch required={false} name="mentioned">When anyone @mentions me</Switch>
			</div>

			<Button type="submit">
				{#if notificationsLoading}
					<LoaderIcon />
				{:else}
					Update email settings
				{/if}
			</Button>

			<!-- <Switch bind:checked={$settings?.email.popularComment}>
			When any of my comments gets popular
		</Switch> -->
		</form>
	</SettingsSection>

	<SettingsSection>
		<h2>Passkeys <Badge>New</Badge></h2>

		<p>
			Passkeys are a new, more secure and safer way to sign into websites using your device's PIN,
			fingerprint or face lock. Manage your passkeys here.
		</p>

		{#if data.userData?.passkeys?.length}
			{#each data.userData.passkeys as passkey}
				<form
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								toast.success('Passkey deleted successfully!');
							}
							if (result.type === 'failure') {
								toast.error(result.data?.message);
							}
							if (result.type === 'error') {
								toast.error(result.error?.message);
							}
							await update();
						};
					}}
					method="post"
					class="passkey"
					action="/account?/deletePasskey"
				>
					<div class="passkey-profile">
						<input type="hidden" name="id" value={passkey.credentialId} />
						<Passkey />
						<div class="passkey-profile-info">
							<span class="passkey-profile-info-name">
								{passkey.name}
							</span>
							<span class="passkey-profile-info-subtext">
								Registered on {dateFormat(passkey.createdAt)}
							</span>
						</div>
					</div>

					<Tooltip>
						<span slot="tooltip-content">Delete passkey</span>
						<Button type="submit" size="sm" style="text">
							<IconTrash />
						</Button>
					</Tooltip>
				</form>
			{/each}
		{:else}
			<div class="no-passkeys">You haven't created any passkey! Create one to sign in faster.</div>
		{/if}

		{#if passkeyUseLoading}
			<LoaderIcon />
		{:else}
			{#if !canUsePasskeys}
				<p>Your browser doesn't support passkeys. You can still sign in with email verification.</p>
			{/if}
			<Button disabled={!canUsePasskeys} href="/account/create-passkey">
				<Passkey />
				Create a passkey
			</Button>
		{/if}
	</SettingsSection>

	<!-- <SettingsSection>
		<h2>Sessions</h2>

		<p>
			Here are all the devices you're logged in on. You can log out of them individually, or log out
			all of them at once.
		</p>

		{#if data.userData?.passkeys?.length}
			{#each data.userData.passkeys as passkey}
				<div class="passkey">
					{passkey.name}
				</div>
			{/each}
		{:else}
			You haven't saved a passkey!
		{/if}
	</SettingsSection> -->

	<SettingsSection>
		<h2>Danger zone</h2>

		<div class="buttons">
			<form
				use:enhance={() => {
					signOutLoading = true;
					return async ({ update }) => {
						signOutLoading = false;
						await update();
					};
				}}
				action="/account?/signOut"
				method="post"
			>
				<Button style="outlined" type="submit">
					{#if signOutLoading}
						<LoaderIcon />
					{:else}
						<IconLogout />
						Sign out
					{/if}
				</Button>
			</form>

			<Button on:click={() => (showDeleteModal = true)} style="danger">
				<IconAlertTriangleFilled />
				Delete Account
			</Button>
		</div>
	</SettingsSection>
{:else}
	<SettingsSection>
		<LoginForm />
	</SettingsSection>
{/if}

<style lang="scss">
	.description {
		font-size: 0.9rem;
		color: var(--color-on-surface);
	}

	.edit-profile {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.settings-item {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	.switches {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	.passkey {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 0.5rem 0;

		&-profile {
			display: flex;
			align-items: center;

			&-info {
				display: flex;
				flex-direction: column;

				&-name {
					font-weight: 500;
				}

				&-subtext {
					font-size: 0.9rem;
					color: var(--color-on-surface);
				}
			}

			:global(svg) {
				margin-right: 1rem;
				width: 2rem;
				height: 2rem;
			}
		}
	}

	.no-passkeys {
		margin: 0.5rem 0;
	}
</style>
