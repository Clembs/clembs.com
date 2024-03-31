<script lang="ts">
	import { SocialName, email, socials } from '$lib/data/socials';
	import { IconHeart } from '@tabler/icons-svelte';
	import LinksList from '$lib/components/LinksList.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags
	pageName="Contact - Clembs"
	description="Contact me through email, social media or donate to support my work."
/>

<main>
	<header>
		<img src="/assets/logo-purplue.webp" width={64} height={64} alt="Clembs' logo" />

		<h1>Connect with me</h1>
	</header>

	<LinksList socials={[email]} />

	<LinksList {socials} />

	<LinksList
		socials={[
			{
				id: SocialName.Kofi,
				name: 'Donate',
				url: '/donate',
				icon: IconHeart,
				description: 'Support me and my work',
			},
		]}
	/>
</main>

<style lang="scss">
	main {
		padding: 1rem 1rem 2rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 500px;
		margin: 0 auto;

		header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;

			img {
				border-radius: 50%;
				border: 2px solid var(--color-outline);
			}
		}
	}
</style>
