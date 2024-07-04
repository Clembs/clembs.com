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
	<div id="head-bar">
		{#if data.player}
			<a href={data.player.teamId ? '/smp/my-team' : '/smp/teams'} class="username">
				{#if data.player.uuid}
					<img src="https://crafatar.com/avatars/{data.player.uuid}?size=32" alt="Player avatar" />
				{:else}
					<img
						width={32}
						height={32}
						src="https://m.clembs.com/placeholder-image.png"
						alt="Player avatar"
					/>
				{/if}
				<span>My account</span>
			</a>
		{:else}
			<a href="/smp/register">{strings.registerSignIn}</a>
		{/if}
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
	</div>

	<slot />
</main>

<style lang="scss">
	main {
		margin: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: 'General Sans', Inter, var(--font-stack);
	}

	#head-bar {
		display: flex;
		justify-content: space-between;

		.username {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
