<script lang="ts">
	import SectionGuide from './SectionGuide.svelte';
	import SectionRules from './SectionRules.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Button from '$lib/components/Button.svelte';
	import InfoSection from './InfoSection.svelte';
	import AboutSection from './AboutSection.svelte';
	import { languages } from './locales';

	let { data } = $props();
	let strings = $derived(languages[data.language]);
</script>

<MetaTags
	pageName="Habile SMP"
	image="/assets/smp/habile-smp-banner.png"
	description="The Habile SMP (Survival Multi Player) is a multiplayer Minecraft server where players from around the world come together to build, fight, survive and create!"
/>

<header>
	<img id="hero-image" src="/assets/smp/habile-smp-banner.png" alt="Habile SMP" />

	{#if !data.player?.teamId}
		<div id="waitlist-bar">
			{#if !data.player}
				{strings.registerNowText}
				<Button size="xl" href="/smp/register">{strings.registerNowCta}</Button>
			{:else}
				{strings.viewCreateTeamsText}
				<Button size="xl" href="/smp/teams">{strings.viewCreateTeamsCta}</Button>
			{/if}
		</div>
	{/if}
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

<style lang="scss">
	#hero-image {
		border-radius: 1rem;
		border: 1px solid var(--color-outline);
		margin-bottom: 1rem;
	}

	#waitlist-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		border: 1px solid var(--color-on-background);
		border-radius: 99rem;
		padding: 1.5rem 2rem;
		text-align: center;
		text-wrap: balance;
		font-size: clamp(1.5rem, 2vw, 2rem);
		font-weight: 500;
		width: 100%;
		gap: 1rem;

		@media (max-width: 650px) {
			border-radius: 3rem;
			flex-direction: column;
			padding-left: 1rem;
			align-items: center;
			text-align: center;
		}
	}
</style>
