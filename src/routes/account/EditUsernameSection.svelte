<script lang="ts">
	import { enhance } from '$app/forms';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import IconInfoCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconInfoCircleFilled.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import type { LayoutData } from '../$types';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';

	export let data: LayoutData;

	let showModal = false;
	let isLoading = false;
	let error = '';
	let username = data?.userData?.username;
</script>

<Modal bind:showModal>
	<h1 slot="title">How is my avatar generated?</h1>

	<p>
		The colors in your avatar are based on the first and last character of your username.<br />
		Every character that is allowed in your username has a specific color code mapped to it, which is
		why every time you change the first or last character, a different gradient shows up!
	</p>

	<Button on:click={() => (showModal = false)}>Got it!</Button>
	<Button
		style="outlined"
		href="https://github.com/Clembs/clembs.com/blob/b29beb998fb621e306bf07bd5db0dfacfea09abe/src/lib/components/GradientAvatar/GradientAvatar.svelte"
	>
		View source code
	</Button>
</Modal>

<section>
	<h2>Edit Username</h2>

	<p>
		Your username needs to be between 2 and 32 characters in length, and can only contain roman
		letters, numbers and some special characters.
	</p>

	<form
		use:enhance={() => {
			isLoading = true;
			return async ({ result, update }) => {
				isLoading = false;

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
		<div class="profile">
			<button class="avatar" on:click|preventDefault={() => (showModal = true)}>
				<GradientAvatar
					size="3rem"
					user={{
						...data?.userData,
						username: username || 'anonymous user',
					}}
					showBadge={false}
				/>

				<div class="info-btn">
					<IconInfoCircleFilled size={22} />
				</div>
			</button>

			<TextInput
				bind:value={username}
				minlength={2}
				maxlength={32}
				label="New username"
				name="username"
			/>
		</div>

		{#if error}
			<InfoBox type="danger">
				<span slot="title">An error occured.</span>
				{error}
			</InfoBox>
		{/if}

		<Button
			disabled={isLoading || username === data?.userData?.username || !username}
			type="submit"
		>
			{#if isLoading}
				<LoaderIcon />
			{:else}
				Change username
			{/if}
		</Button>
	</form>
</section>

<style lang="scss">
	form {
		width: 100%;
		text-align: left;

		.profile {
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 1rem;
			gap: 1rem;

			.avatar {
				position: relative;
				border: none;
				cursor: pointer;
				margin: 0;
				padding: 0;
				background-color: transparent;
				border-radius: 99rem;

				.info-btn {
					position: absolute;
					padding: 0.125rem;
					border-radius: 99rem;
					border: 1px solid var(--color-on-background);
					display: grid;
					align-items: center;
					background-color: var(--color-background);
					right: -8px;
					bottom: -8px;
				}
			}

			:global(.text-input) {
				flex: 1;
			}
		}
	}
</style>
