<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { languages } from '../../locales';
	import AccountType from './AccountType.svelte';
	import UsernameCracked from './UsernameCracked.svelte';
	import UsernamePremium from './UsernamePremium.svelte';

	export let data;
	$: strings = languages[data.language];

	let steps = ['type', 'username'] as const;
	let currentStep: (typeof steps)[number] = 'type';
	let progress = tweened(steps.indexOf(currentStep), { duration: 300 });

	$: progress.set(steps.indexOf(currentStep));

	let userData: Partial<{
		type: 'premium' | 'cracked';
		username: string;
		uuid: string;
	}> = {};

	const previousStep = () => (currentStep = steps[$progress - 1]);
	const nextStep = () => (currentStep = steps[$progress + 1]);

	async function createPlayer() {
		const req = await fetch('/smp/register/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (req.ok) {
			window.location.href = '/smp/register/success';
		}
	}
</script>

<div>
	{Math.round($progress) + 1}/{steps.length}
	<progress value={$progress + 1 / steps.length}></progress>

	{#if currentStep === 'type'}
		<AccountType
			on:change={(e) => {
				userData.type = e.detail;
				nextStep();
			}}
			{strings}
		/>
	{:else if currentStep === 'username'}
		{#if userData.type === 'cracked'}
			<UsernameCracked
				on:next={(e) => {
					userData.username = e.detail.username;
					createPlayer();
				}}
				on:back={previousStep}
				{strings}
			/>
		{:else}
			<UsernamePremium
				on:next={(e) => {
					userData.username = e.detail.username;
					userData.uuid = e.detail.uuid;
					createPlayer();
				}}
				on:back={previousStep}
				{strings}
			/>
		{/if}
	{/if}
</div>

<style lang="scss">
	progress {
		width: 100%;
		border: 1px solid var(--color-outline);
		border-radius: 99rem;
		margin-bottom: 1rem;
		background-color: var(--color-background);

		&::-webkit-progress-bar {
			background-color: var(--color-background);
			border-radius: 99rem;
		}

		&::-webkit-progress-value {
			background-color: var(--color-primary);
			border-radius: 99rem;
		}

		&::-moz-progress-bar {
			background-color: var(--color-primary);
			border-right: 1px solid var(--color-outline);
			border-radius: 99rem;
		}
	}
</style>
