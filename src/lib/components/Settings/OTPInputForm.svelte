<script lang="ts">
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import { LoaderIcon } from 'svelte-french-toast';
	import { OTP_REGEX } from '$lib/helpers/regex';
	import { goto } from '$app/navigation';
	import { IconMail } from '@tabler/icons-svelte';

	export let email: string;
	export let isNewUser: boolean;
	export let showModal = false;

	export let error = '';
	let otp = '';
	let loading = false;
</script>

<form
	use:enhance={() => {
		error = '';
		loading = true;

		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'redirect' && result.location === '/settings') {
				showModal = false;
				return;
			}
			if (result.type === 'failure' && typeof result.data?.message === 'string') {
				error = result.data?.message;
				return;
			}
			if (result.type === 'error') {
				error = result.error?.message;
				return;
			}

			showModal = false;
			await update();
			location.reload();
		};
	}}
	action="/account?/verifyOTP"
	method="post"
>
	<header>
		<IconMail size={64} />

		<h1>Use your one-time code to {isNewUser ? 'create your account' : 'sign in'}</h1>

		<p>
			I've sent an email to <strong>{email}</strong>. Check it and enter the given one-time code to {isNewUser
				? 'create your clembs.com account'
				: 'sign in to clembs.com'}
		</p>
	</header>

	<input type="hidden" name="email" value={email} />

	<TextInput
		bind:value={otp}
		name="otp"
		label="Login code"
		type="number"
		placeholder="000000"
		required={true}
		maxlength={999999}
	/>

	<Button inline={false} type="submit" disabled={!OTP_REGEX.test(otp)}>
		{#if loading}
			<LoaderIcon />
		{:else}
			Sign in
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
