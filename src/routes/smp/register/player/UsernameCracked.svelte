<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LanguageSchema } from '../../locales';
	import InfoBox from '$lib/components/InfoBox.svelte';

	export let strings: LanguageSchema;

	let username: string;
	let uuid: string;
	let error: string;
	let timeout: number | NodeJS.Timeout;

	const dispatch = createEventDispatcher();

	async function fetchProfile() {
		error = '';
		if (username.trim().length < 3) return;

		timeout = setTimeout(async () => {
			const req = await fetch(`/smp/register/player/check?username=${username}`);

			if (!req.ok) {
				error = (await req.json()).message;
				return;
			}

			uuid = await req.text();
		}, 500);
	}
</script>

<div class="question">
	<header>
		<h2>{strings.register.player.usernameCracked.title}</h2>
		<p class="subtext">
			{strings.register.player.usernameCracked.description}
		</p>
	</header>

	<div class="split-view">
		<TextInput
			bind:value={username}
			label={strings.register.player.usernameCracked.textInputLabel}
			on:input={fetchProfile}
			required
			minlength={3}
			maxlength={32}
			name="username"
		/>
	</div>

	{#if error}
		<InfoBox type="danger">
			{error}
		</InfoBox>
	{/if}

	<div class="buttons">
		<Button inline={false} on:click={() => dispatch('back')} style="outlined">
			{strings.register.back}
		</Button>
		<Button
			on:click={() => dispatch('next', { username })}
			inline={false}
			disabled={!username || username.length < 3 || username.length > 32 || !!error}
		>
			{strings.register.player.usernameCracked.confirmButton}
		</Button>
	</div>
</div>

<style lang="scss">
	.question {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		h2 {
			font-size: 2rem;
		}

		.buttons {
			display: flex;
			gap: 1rem;
		}
	}
</style>
