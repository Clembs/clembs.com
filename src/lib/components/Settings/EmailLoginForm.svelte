<script lang="ts">
	import { enhance } from '$app/forms';
	import { EMAIL_REGEX } from '$lib/helpers/regex';
	import { LoaderIcon } from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';
	import PasskeyLogin from './PasskeyLoginButton.svelte';
	import IconMail from '@tabler/icons-svelte/dist/svelte/icons/IconMail.svelte';
	import { createEventDispatcher } from 'svelte';

	export let showModal = false;
	export let canUsePasskeys = false;
	export let error = '';

	let email = '';
	let loading = false;

	const dispatch = createEventDispatcher();
</script>

<form
	action="/account?/emailSendOTP"
	use:enhance={() => {
		error = '';
		loading = true;

		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'failure') {
				error = result.data?.message;
				return;
			}
			if (result.type === 'error') {
				error = result.error?.message;
				return;
			}
			if (result.type === 'success' && result.data) {
				dispatch('otpSent', {
					isNewUser: result.data?.isNewUser,
					email,
				});
			}

			await update();
		};
	}}
	method="post"
>
	<header>
		<HabileHappy />

		<h1>Sign in to clembs.com</h1>

		<p>
			Create an account or sign in to vote on comments, use a username, and more!<br />
			The process takes less than 2 minutes, and you can always delete your account.
		</p>
	</header>

	<TextInput
		bind:value={email}
		name="email"
		label="Email"
		type="email"
		placeholder="example@clembs.com"
		autofocus
		required={true}
	/>

	<Button inline={false} type="submit" disabled={!EMAIL_REGEX.test(email)}>
		{#if loading}
			<LoaderIcon />
		{:else}
			<IconMail />
			Continue with email verification
		{/if}
	</Button>
</form>

{#if canUsePasskeys}
	<PasskeyLogin disabled={!EMAIL_REGEX.test(email)} bind:error bind:showModal bind:email />
{/if}

<style lang="scss">
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		header {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			align-items: center;

			h1 {
				font-size: 2rem;
				text-align: center;
			}
		}
	}
</style>
