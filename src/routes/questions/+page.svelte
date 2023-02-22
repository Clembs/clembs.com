<script lang="ts">
	import { colors } from '$lib/colors';
	import Clembs from '$lib/icons/Clembs.svelte';
	import type { ActionData } from './$types';

	let identity: string;
	let question: string;
	let textareaEl: HTMLTextAreaElement;
	let loading = false;

	const splashes = [
		`Curieux à mon sujet ? Comme c'est mignon...`,
		"Parce que j'avais la flemme d'installer une appli fait pour...",
		'Tout ce que vous dites est sous anonymat!',
		"Tu te poses une question ? J'y réponds !",
		'Réponses uniquement sur mon IG privé !',
		'Sois poli et respectueux... ou pas, OSEF !',
		'Site commencé à 23h et fini à 2h...',
		'Your base are belong to us!',
		'Appli faite par mes soins en ~3h',
		'Produit pur Carcassonnais!',
		'Tu lis ce texte ?',
		'Rafraîchis la page pour plus de textes 😜d🥺é🥵g🤣a😶‍🌫️n😭t🥶é😳s🍤!!',
		'Oserez-vous dévoiler un indice sur votre identité ?',
		'Plus de fonctionnalités soon™',
		'Streams tous les samedis après-midi (sauf congés bac)',
		'Alors, ça révise pas le bac ?',
		'Apprends-en plus sur ma vie !',
		'Alors comme ça, ça demande des renseignements ?',
		"Demande-moi n'importe quoi !",
		'Il est quand même pas trop mal fait ce site, nan ?',
		"Site libre d'expression depuis 2023."
	];

	export let form: ActionData;
</script>

<main>
	<nav>
		<div class="title">
			<Clembs />Questions anonymes
		</div>
		<span class="version">v1.2</span>
	</nav>

	{#if form?.success}
		<div class="success-screen">
			✅ Question envoyée avec succès ! <br />
			Veux-tu m'en reposer une ?
			<button on:click={() => history.go()}> 😳 Allez, pourquoi pas ! </button>
		</div>
	{:else}
		<form method="POST">
			<header>{splashes[Math.floor(Math.random() * splashes.length)]}</header>
			<textarea
				bind:this={textareaEl}
				bind:value={question}
				on:input={() => {
					textareaEl.style.height = '';
					textareaEl.style.height = `${textareaEl.scrollHeight + 3}px`;
				}}
				maxlength={500}
				name="question"
				required
				placeholder="🗣️ Posez-moi une question, racontez-moi une histoire ou une blague, délivrez toute votre haine envers moi, etc."
			/>
			<input
				name="identity"
				bind:value={identity}
				type="text"
				placeholder="👀 Un indice sur vous ? (facultatif)"
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
			<button
				disabled={!question?.length || loading}
				on:submit={(ev) => (loading = true)}
				class:loading
			>
				{#if loading}
					Envoi en cours...
				{:else}
					{!identity ? '🕵️ Envoyer anonymement' : '📤 Envoyer'}
				{/if}
			</button>
		</form>
	{/if}
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
		height: 100%;
	}
	.colors {
		width: 100%;

		.options {
			display: flex;
			gap: 1rem;
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
		height: 30%;
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
		&[disabled] {
			background: white;
			color: black;
			opacity: 0.5;
		}
		overflow: hidden;
		transition: 0.08s ease-in;
		position: relative;
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
