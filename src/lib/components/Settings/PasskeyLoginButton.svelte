<script lang="ts">
	import { enhance } from '$app/forms';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import Passkey from '$lib/svg/Passkey.svelte';

	export let showModal = false;
	export let error: string;
	export let disabled = false;
	export let email: string;

	let loading = false;
</script>

<form
	action="/account?/passkeyLoginRequestChallenge"
	use:enhance={(etc) => {
		return async ({ result, update }) => {
			loading = false;

			if (result.type === 'success' && result.data) {
				loading = true;
				const { options } = result.data;

				const { startAuthentication } = await import('@simplewebauthn/browser');

				try {
					const response = await startAuthentication(options);

					const formData = new FormData();

					formData.append(
						'body',
						JSON.stringify({
							type: 'login',
							email,
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
						toast.success(`Welcome back to clembs.com!`);
						showModal = false;
					}
				} catch (e) {
					error = String(e);
				}
			}

			if (result.type === 'failure') {
				error = result.data?.message;
			}

			loading = false;
			await update();
			location.reload();
		};
	}}
	method="post"
>
	<input type="hidden" name="email" value={email} />

	<Button style="outlined" inline={false} type="submit" disabled={disabled || loading}>
		{#if loading}
			<LoaderIcon />
		{:else}
			<Passkey /> Sign in with a previously created passkey
		{/if}
	</Button>
</form>
