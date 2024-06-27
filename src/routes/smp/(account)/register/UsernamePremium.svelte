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
			const req = await fetch(`/smp/register/check?username=${username}&withUuid=true`);

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
		<h2>{strings.register.player.usernamePremium.title}</h2>
		<p class="subtext">
			{strings.register.player.usernamePremium.description}
		</p>
	</header>

	<div class="split-view">
		<TextInput
			bind:value={username}
			label={strings.register.player.usernamePremium.textInputLabel}
			placeholder={strings.register.player.usernamePremium.placeholder}
			on:input={fetchProfile}
			required
			minlength={3}
			maxlength={32}
			name="username"
		/>

		<div class="avatar-zone" class:blank={!uuid}>
			<img
				src="https://crafatar.com/renders/body/{uuid || '069a79f444e94726a5befca90e38aaf5'}?overlay"
				alt="{username}'s avatar."
			/>
		</div>
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
			on:click={() => dispatch('next', { username, uuid })}
			inline={false}
			disabled={!username || !uuid || !!error}
		>
			{strings.register.player.usernamePremium.confirmButton}
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

		.split-view {
			display: flex;
			gap: 1rem;

			.avatar-zone {
				width: 120px;
				flex-shrink: 0;
				background-color: var(--color-surface);
				border-radius: 1rem;
				border: 1px solid var(--color-outline);
				padding: 1rem;
				position: relative;

				img {
					filter: drop-shadow(2px 2px);
				}

				&.blank {
					img {
						filter: contrast(0);
					}

					&::after {
						content: '?';
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						font-size: 3rem;
					}
				}
			}
		}

		.buttons {
			display: flex;
			gap: 1rem;
		}
	}
</style>
