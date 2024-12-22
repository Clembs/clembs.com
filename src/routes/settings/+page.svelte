<script lang="ts">
	import { page } from '$app/stores';
	import LoginForm from '$lib/components/Settings/LoginForm.svelte';
	import { enhance } from '$app/forms';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import DeleteAccountModal from './DeleteAccountModal.svelte';
	import type { PageData } from './$types';

	import { IconLogout, IconAlertTriangleFilled } from '@tabler/icons-svelte';

	export let data: PageData;

	let usernameChangeLoading = false;
	let signOutLoading = false;
	let error = '';
	let username = data?.userData?.username;
	let showDeleteModal = false;
</script>

<main>
	{#if data?.userData}
		<DeleteAccountModal bind:showDeleteModal />

		<h1>Account Settings</h1>

		<section>
			<h2>Profile</h2>

			<form
				class="edit-profile"
				use:enhance={() => {
					usernameChangeLoading = true;
					return async ({ result, update }) => {
						usernameChangeLoading = false;

						if (result.type === 'failure') {
							error = String(result.data?.message);
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

					<p class="subtext">
						A unique name that's up to 32 characters long, made of alphanumerical characters and
						some special characters.
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

					<p class="subtext">
						With colors based off the first and last characters of your username. Change it and see
						the colors change!
					</p>

					<GradientAvatar
						size="5rem"
						user={{
							...$page.data?.userData,
							username: username || 'Guest',
						}}
					/>
				</div>
			</form>
		</section>

		<section>
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
		</section>
	{:else}
		<section>
			<LoginForm />
		</section>
	{/if}
</main>

<style lang="scss">
	main {
		padding: 1rem;
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

	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;

		:global(h2) {
			margin-bottom: 1rem;
		}
	}
</style>
