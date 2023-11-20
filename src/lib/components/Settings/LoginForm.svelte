<script lang="ts">
	import { onMount } from 'svelte';
	import EmailLogin from './EmailLoginForm.svelte';
	import InfoBox from '../InfoBox.svelte';
	import OtpInput from './OTPInputForm.svelte';

	export let showModal = false;
	export let error = '';

	let canUsePasskeys: boolean;
	let screen: 'login' | 'verify-otp' | 'create-passkey' = 'login';
	let email: string;
	let isNewUser: boolean;

	onMount(async () => {
		const { browserSupportsWebAuthn } = await import('@simplewebauthn/browser');
		canUsePasskeys = browserSupportsWebAuthn();
	});
</script>

<div class="login-form">
	{#if error}
		<InfoBox type="danger">
			{error}
		</InfoBox>
	{/if}

	{#if screen === 'login'}
		<EmailLogin
			on:otpSent={(ev) => {
				isNewUser = ev.detail.isNewUser;
				email = ev.detail.email;
				screen = 'verify-otp';
			}}
			{canUsePasskeys}
			bind:showModal
			bind:error
		/>
	{:else}
		<OtpInput {email} {isNewUser} bind:showModal bind:error />
	{/if}

	<!-- {#if canUsePasskeys}
		<PasskeyLogin bind:showModal bind:error />
	{/if} -->
</div>

<style lang="scss">
	.login-form {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		margin: 0 auto;
		gap: 1rem;

		:global(header svg) {
			width: 128px;
			height: 128px;
		}
	}
</style>
