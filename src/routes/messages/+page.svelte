<script lang="ts">
	import { colors, splashes, type Message } from '.';
	import Clembs from '$lib/icons/Clembs.svelte';
	import type { ActionData } from './$types';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import PreviousMessage from './PreviousMessage.svelte';
	import { blur } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import { IconMasksTheater, IconMasksTheaterOff } from '@tabler/icons-svelte';

	let identity: string;
	let question: string;
	let textareaEl: HTMLTextAreaElement;
	let loadingMessages = true;
	let previousMessages: Message[];
	let formEl: HTMLFormElement;
	let selectedMessageForContext: Message | null;

	export let form: ActionData;

	onMount(() => {
		previousMessages = (JSON.parse(localStorage.getItem('messages') || '[]') as Message[]).sort(
			(a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
		);
		loadingMessages = false;
	});

	async function handleSubmit(event: SubmitEvent) {
		const data = new FormData(formEl);

		if (selectedMessageForContext) {
			data.set('selectedMessage', JSON.stringify(selectedMessageForContext));
		}

		const response = await fetch(formEl.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (response.ok && result.type === 'success') {
			const message: Message = {
				color: data.get('color')?.toString() || 'black',
				content: data.get('question')?.toString()!,
				date: new Date().toISOString(),
				identity: data.get('identity')?.toString()
			};

			const messages: Message[] = JSON.parse(localStorage.getItem('messages') || '[]');

			messages.push(message);

			localStorage.setItem('messages', JSON.stringify(messages));

			applyAction(result);
		}
	}
</script>

<main>
	<nav>
		<div class="title">
			<Clembs />Messages anonymes
		</div>
		<span class="version">v1.4</span>
	</nav>

	{#if form?.success}
		<div class="success-screen">
			✅ Message envoyé avec succès ! <br />
			Tu veux m'en revoyer un ?
			<Button on:click={() => history.go()}>😳 Allez, pourquoi pas !</Button>
		</div>
	{:else}
		<form bind:this={formEl} method="POST" on:submit|preventDefault={handleSubmit}>
			<header>{splashes[Math.floor(Math.random() * splashes.length)]}</header>
			{#if selectedMessageForContext}
				Votre message sera accompagné de celui-ci :
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div transition:blur on:click={() => (selectedMessageForContext = null)}>
					<PreviousMessage message={selectedMessageForContext} />
				</div>
			{/if}
			<textarea
				bind:this={textareaEl}
				bind:value={question}
				maxlength={500}
				name="question"
				required
				placeholder="🗣️ Pose-moi une question, raconte-moi une histoire ou une blague, délivre-moi toute ta haine, etc."
			/>
			<input
				name="identity"
				bind:value={identity}
				type="text"
				placeholder="👀 Un indice sur toi ? (facultatif)"
				maxlength={200}
			/>
			<div class="colors">
				Couleur de ton message :
				<div class="options">
					{#each Object.entries(colors) as [name, value]}
						<input
							type="radio"
							id="color"
							name="color"
							value={name}
							style="--color: {value}"
							checked={name === 'black'}
						/>
					{/each}
				</div>
			</div>
			<div>
				<Button>
					{#if !identity}
						<IconMasksTheater />
						Envoyer anonymement
					{:else}
						<IconMasksTheaterOff />
						Envoyer avec l'indice
					{/if}
				</Button>
			</div>
		</form>
	{/if}
	<div class="previous-messages">
		<h2>Continuer un message envoyé précédemment :</h2>
		{#if loadingMessages}
			Chargement des anciens messages...
		{:else}
			<div class="messages">
				{#each previousMessages as message}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="msg"
						on:click={() => {
							document.body.scroll({ top: 0, behavior: 'smooth' });
							document.documentElement.scroll({ top: 0, behavior: 'smooth' });
							selectedMessageForContext = message;
						}}
					>
						<PreviousMessage {message} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>

<style lang="scss">
	.success-screen {
		margin: 1rem;
		display: flex;
		gap: 2rem;
		flex-direction: column;
		font-size: 1.4rem;
		height: 100%;
		justify-content: center;
	}
	nav {
		border-bottom: 1px solid black;
		font-size: 1.2rem;
		font-weight: 600;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.version {
			color: rgb(0 0 0 / 0.3);
		}

		.title {
			display: flex;
			gap: 1rem;
			align-items: center;
		}
	}
	.previous-messages {
		border-top: 1px solid black;
		padding: 0 1rem;

		.messages {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
	header {
		font-size: 1.8rem;
		font-weight: 600;
		padding: 0.6rem 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1rem;
	}
	.colors {
		width: 100%;

		.options {
			margin: 0.8rem 0;
			display: flex;
			gap: 5px;
			justify-content: space-between;
			input[type='radio'] {
				appearance: none;
				width: 4rem;
				height: 4rem;
				border-radius: 99px;
				border: 1px solid black;
				display: block;
				transition: 0.09s all linear;
				background-color: var(--color);
				position: relative;
				&:checked {
					&::after {
						content: '✅';
						font-size: 1.5rem;
						position: absolute;
						transform: translate(-1.5rem, -1.5rem);
					}
					border: 6px solid black;
				}
			}
		}
	}
	textarea {
		height: 15rem;
	}
	textarea,
	input {
		border: 1px solid black;
		padding: 0.7rem;
		border-radius: 0.5rem;
		resize: none;
		font-family: inherit;
		font-size: 1.1rem;
		// height: max-content;
	}
</style>
