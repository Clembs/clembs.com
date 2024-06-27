<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { languages } from '../../../locales';
	import { colors } from '../../_helpers';

	export let data;
	$: strings = languages[data.language];
	export let form;

	let isPrivate = false;
</script>

<div class="question">
	<header>
		<h2>{strings.register.team.title}</h2>

		<p class="subtext">{strings.register.team.description}</p>

		<InfoBox type="caution">
			{strings.register.team.disclaimer}
		</InfoBox>
	</header>

	<form use:enhance method="post">
		<TextInput
			name="name"
			label={strings.register.team.nameInputLabel}
			minlength={4}
			maxlength={32}
		/>

		<section class="color">
			<h3>{strings.register.team.colorInputLabel}</h3>

			<div class="colors">
				{#each colors as { name, hex } (name)}
					{@const disabled = data.usedColors.includes(name)}
					<input
						class="color"
						type="radio"
						name="color"
						value={name}
						style:--color={hex}
						required
						{disabled}
					/>
				{/each}
			</div>
		</section>

		<section class="private">
			<Switch bind:checked={isPrivate} required={false}>
				{strings.register.team.privateTeam.label}
			</Switch>
			<p>
				{strings.register.team.privateTeam.description}
			</p>

			{#if isPrivate}
				<TextInput
					name="invite-code"
					label={strings.register.team.privateTeam.inviteCodeInputLabel}
					placeholder={strings.register.team.privateTeam.inviteCodePlaceholder}
					type="number"
					minlength={6}
					maxlength={6}
				/>
			{/if}
		</section>

		{#if form?.message}
			<InfoBox type="danger">
				{form.message}
			</InfoBox>
		{/if}

		<Button inline={false} type="submit">{strings.register.team.submitButton}</Button>
	</form>
</div>

<style lang="scss">
	.question {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2 {
			font-size: 2rem;
		}

		h3 {
			font-size: 0.9rem;
			font-weight: 500;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		header,
		section {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.colors {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
			gap: 0.5rem;

			.color {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				margin: 0;
				width: 3rem;
				aspect-ratio: 1;
				display: block;
				border-radius: 50%;
				border: 2px solid var(--color-outline);
				background-color: var(--color);
				cursor: pointer;
				position: relative;
				transition: 100ms border;

				&:disabled {
					filter: grayscale(1);
				}

				&:hover {
					border-width: 3px;
				}

				&:checked {
					border: 5px solid var(--color-primary);

					&::after {
						content: '✅';
						font-size: 1.25rem;
						position: absolute;
						left: -0.5rem;
						top: -0.5rem;
					}
				}
			}
		}
	}
</style>
