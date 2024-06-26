<script lang="ts">
	import SectionGuide from './SectionGuide.svelte';
	import SectionRules from './SectionRules.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Button from '$lib/components/Button.svelte';
	import InfoSection from './InfoSection.svelte';
	import AboutSection from './AboutSection.svelte';
	import { languages } from './locales';
	import { enhance } from '$app/forms';

	export let data;

	let currentLanguage = data.language;

	let form: HTMLFormElement;
	$: strings = languages[currentLanguage];
</script>

<svelte:head>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<MetaTags
	pageName="Habile SMP"
	image="/assets/smp/habile-smp-banner.png"
	description="The Habile SMP (Survival Multi Player) is a multiplayer Minecraft server where players from around the world come together to build, fight, survive and create!"
/>

<main>
	<form use:enhance bind:this={form} method="post" id="language-selection">
		{strings.language.button}
		{#if currentLanguage !== 'en'}
			/ Language
		{/if}
		<select name="language" bind:value={currentLanguage} on:change={() => form.requestSubmit()}>
			<option selected={data.language === 'en'} value="en">{languages.en.language.name}</option>
			<option selected={data.language === 'fr'} value="fr">French</option>
			<option selected={data.language === 'ru'} value="ru">{languages.ru.language.name}</option>
		</select>
	</form>

	<header>
		<img id="hero-image" src="/assets/smp/habile-smp-banner.png" alt="Habile SMP" />

		<div id="waitlist-bar">
			{strings.registrationsOpen}
			<Button size="xl" href="/discord">{strings.registrationsCta}</Button>
		</div>
	</header>

	<InfoSection {strings} />

	<AboutSection {strings} />

	<SectionGuide {strings} />

	<SectionRules {strings} />

	{#if strings.credits}
		<p>
			Russian localization provided by {strings.credits}
		</p>
	{/if}
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

	#hero-image {
		border-radius: 1rem;
		border: 1px solid var(--color-outline);
		margin-bottom: 1rem;
	}

	#waitlist-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		border: 1px solid var(--color-on-background);
		border-radius: 99rem;
		padding: 1rem;
		padding-left: 1.75rem;
		font-size: clamp(1.5rem, 2vw, 2rem);
		font-weight: 500;
		width: 100%;
		gap: 1rem;
		flex-wrap: wrap;

		@media (max-width: 650px) {
			border-radius: 3rem;
			flex-direction: column;
			padding-left: 1rem;
			align-items: center;
			text-align: center;
		}
	}
</style>
