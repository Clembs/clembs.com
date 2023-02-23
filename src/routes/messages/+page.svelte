<script lang="ts">
	import { colors, splashes, type Message } from '.';
	import Clembs from '$lib/icons/Clembs.svelte';
	import type { ActionData } from './$types';
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import PreviousMessage from './PreviousMessage.svelte';
	import { blur } from 'svelte/transition';

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
		<span class="version">v1.3</span>
	</nav>

	{#if form?.success}
		<div class="success-screen">
			✅ Message envoyé avec succès ! <br />
			Tu veux m'en revoyer un ?
			<button on:click={() => history.go()}> 😳 Allez, pourquoi pas ! </button>
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
				Couleur de ton message <span class="new">nouveau</span> :
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
			<button>
				{!identity ? '🕵️ Envoyer anonymement' : '📤 Envoyer'}
			</button>
		</form>
	{/if}
	<span class="divider" />
	<div class="previous-messages">
		<h2>Continuer un message envoyé précédemment <span class="new">Nouveau</span> :</h2>
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
	main {
		min-width: 70%;
		max-width: 50rem;
		margin: 0 auto;
		font-family: Figtree;
		font-size: 18px;
		height: 100%;
	}
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
		padding: 0.8rem 1rem;
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
	.new {
		color: white;
		border: 1px solid black;
		padding: 0.2rem 0.4rem;
		font-weight: 700;
		border-radius: 99px;
		font-size: 0.9rem;
		text-transform: uppercase;
		background-color: #987fff;
	}
	.previous-messages {
		margin: 1rem;

		.messages {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
	header {
		font-size: 2rem;
		font-weight: 600;
		padding: 1rem 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0 1rem;
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
	span.divider {
		margin: 1rem 0;
		display: block;
		border: 1px solid black;
	}
	textarea,
	input {
		border: 1px solid black;
		padding: 0.7rem;
		border-radius: 0.2rem;
		resize: none;
		font-family: inherit;
		font-size: 1.2rem;
		// height: max-content;
	}
	button {
		transition: 0.08s ease-in;
		border: 1px solid black;
		background-color: black;
		z-index: 1;
		color: white;
		padding: 1rem;
		font-family: inherit;
		font-weight: 500;
		border-radius: 0.2rem;
		font-size: 1.4rem;
	}
</style>
