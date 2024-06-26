<script lang="ts">
	import { languages } from './locales';
	import { enhance } from '$app/forms';

	export let data;

	let form: HTMLFormElement;
	$: strings = languages[data.language];
</script>

<svelte:head>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<main>
	<form use:enhance bind:this={form} action="/smp?" method="post" id="language-selection">
		{strings.language.button}
		{#if data.language !== 'en'}
			/ Language
		{/if}
		<select name="language" bind:value={data.language} on:change={() => form.requestSubmit()}>
			<option selected={data.language === 'en'} value="en">{languages.en.language.name}</option>
			<option selected={data.language === 'fr'} value="fr">French</option>
			<option selected={data.language === 'ru'} value="ru">{languages.ru.language.name}</option>
		</select>
	</form>

	<slot />
</main>

<style lang="scss">
	main {
		margin: 2.5rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: 'General Sans', Inter, var(--font-stack);
	}

	#language-selection {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
</style>
