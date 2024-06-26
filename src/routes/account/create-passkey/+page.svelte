<script lang="ts">
	import { enhance } from '$app/forms';
	import Passkey from '$lib/svg/Passkey.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import IconCircleCheck from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheck.svelte';
	import IconFingerprint from '@tabler/icons-svelte/dist/svelte/icons/IconFingerprint.svelte';
	import IconMail from '@tabler/icons-svelte/dist/svelte/icons/IconMail.svelte';
	import IconLock from '@tabler/icons-svelte/dist/svelte/icons/IconLock.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let error = '';
	let loading = false;
	let canUsePasskeys = false;

	onMount(async () => {
		const { browserSupportsWebAuthn } = await import('@simplewebauthn/browser');
		canUsePasskeys = browserSupportsWebAuthn();
	});
</script>

<form
	use:enhance={() => {
		loading = true;
		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'success' && result.data) {
				loading = true;
				const { options } = result.data;

				const { startRegistration } = await import('@simplewebauthn/browser');

				try {
					const response = await startRegistration(options);

					const formData = new FormData();

					formData.append(
						'body',
						JSON.stringify({
							type: 'register',
							email: $page.data.userData?.email,
							response: response,
							userAgent: navigator.userAgent,
						})
					);

					const req = await fetch('/account?/verifyChallenge', {
						method: 'POST',
						body: formData,
					});

					const verificationJson = await req.json();

					if (verificationJson.type === 'success') {
						loading = false;
						toast.success(`Your passkey was successfully created!`);
						goto('/settings');
					}
				} catch (e) {
					error = String(e);
				}
			}

			if (result.type === 'failure' && typeof result.data?.message === 'string') {
				toast.error(result.data?.message);
				error = result.data?.message;
			}

			if (result.type === 'success') {
				toast.success('Passkey successfully created!');
				await goto('/settings');
			}

			loading = false;
			await update();
		};
	}}
	action="/account?/passkeyRegisterRequestChallenge"
	method="post"
>
	<header>
		<span class="icon">
			<Passkey />
		</span>

		<h1>Create a passkey for faster sign-ins</h1>

		<ul>
			<li>
				<IconCircleCheck />
				Passkeys are a new, more secure and faster way to sign into websites.
			</li>
			<li>
				<IconFingerprint />
				You can use your device's PIN, fingerprint or face lock as a passkey.
			</li>
			<li>
				<IconMail />
				You can always prefer to sign in with email verification instead.
			</li>
			<li>
				<IconLock />
				<strong>
					Your passkeys never leave your devices, so I can't see your PIN or biometrics.
				</strong>
			</li>
		</ul>
	</header>

	{#if !canUsePasskeys}
		<p>Your browser doesn't support passkeys. You can still sign in with email verification.</p>
	{/if}
	<Button type="submit" disabled={!canUsePasskeys || loading}>
		{#if loading}
			<LoaderIcon />
		{:else}
			Create passkey
		{/if}
	</Button>

	<Button type="button" href="/settings" style="outlined">Skip</Button>
</form>

<style lang="scss">
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		margin: 2rem 0;

		header {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			align-items: center;

			:global(.icon svg) {
				height: 5rem;
				width: 5rem;
			}

			h1 {
				font-size: 2rem;
				text-align: center;
			}

			ul {
				list-style: none;
				padding: 0;

				li {
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}
			}
		}
	}
</style>
