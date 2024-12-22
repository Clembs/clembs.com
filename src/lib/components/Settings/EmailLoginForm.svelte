<script lang="ts">
	import { enhance } from '$app/forms';
	import { EMAIL_REGEX } from '$lib/helpers/regex';
	import { LoaderIcon } from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';
	import { createEventDispatcher } from 'svelte';
	import { IconMail } from '@tabler/icons-svelte';
	import InfoBox from '../InfoBox.svelte';
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

			if (result.type === 'failure' && typeof result.data?.message === 'string') {
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

			loading = false;
			await update();
		};
	}}
	method="post"
>
	<header>
		<HabileHappy />

		<h1>Sign in to clembs.com</h1>
	</header>

	<InfoBox type="caution">
		<h4 slot="title">Sunsetting clembs.com accounts</h4>

		I'm slowly removing clembs.com accounts. You can no longer create a new account, and logging in
		will be removed on January 3rd.
	</InfoBox>

	<TextInput
		bind:value={email}
		name="email"
		label="Email"
		type="email"
		placeholder="example@clembs.com"
		autofocus
		required={true}
		autocomplete="username webauthn"
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
