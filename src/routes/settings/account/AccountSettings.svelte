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
	import Switch from '$lib/components/Switch.svelte';
	import { settingsStore } from '../settings';
	import DeleteAccountModal from './DeleteAccountModal.svelte';

	let usernameChangeLoading = false;
	let notificationsLoading = false;
	let signOutLoading = false;
	let error = '';
	let username = $page.data?.userData?.username;

	let showDeleteModal = false;
</script>

{#if $page.data?.userData}
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
					update({
						reset: false,
					});
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
			action="/settings?/updateSettings"
			use:enhance={() => {
				notificationsLoading = true;
				return async ({ result, update }) => {
					notificationsLoading = false;
					update({
						reset: false,
					});
					toast.success('Settings updated successfully!');
				};
			}}
		>
			<h2>Email notifications</h2>

			<p>You can choose to receive emails for specific events.</p>

			{#if $settingsStore}
				<input type="hidden" name="preferences" value={JSON.stringify($settingsStore)} />

				<div class="switches">
					<Switch required={false} bind:checked={$settingsStore.email.allReplies}>
						When anyone replies to my comments
					</Switch>

					<Switch
						required={false}
						disabled={$settingsStore.email.allReplies}
						bind:checked={$settingsStore.email.clembsReplies}
					>
						<!-- bind:checked={$settingsStore.email.clembsReplies -->
						When Clembs replies to my comments
					</Switch>

					<Switch required={false} bind:checked={$settingsStore.email.mentioned}
						>When anyone @mentions me</Switch
					>
				</div>
			{:else}
				<LoaderIcon />
			{/if}

			<Button
				disabled={!$settingsStore ||
					notificationsLoading ||
					JSON.stringify($page.data.userData?.preferences) === JSON.stringify($settingsStore)}
				type="submit"
			>
				{#if usernameChangeLoading}
					<LoaderIcon />
				{:else}
					Update settings
				{/if}
			</Button>

			<!-- <Switch bind:checked={$settings?.email.popularComment}>
			When any of my comments gets popular
		</Switch> -->
		</form></SettingsSection
	>

	<SettingsSection>
		<h2>Danger Zone</h2>

		<div class="buttons">
			<form
				use:enhance={() => {
					signOutLoading = true;
					return ({ update }) => {
						signOutLoading = false;
						update();
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
		<h2>Do more with a clembs.com account</h2>

		<p>
			Choose your username, post verified comments, sync your settings and more with a clembs.com
			account.
		</p>
		<p>Create an account or log back into it, no passwords required!</p>

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
</style>
