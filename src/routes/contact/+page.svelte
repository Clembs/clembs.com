<script lang="ts">
	import {
		bluesky,
		boosty,
		discord,
		email,
		github,
		instagram,
		kofi,
		resume,
		twitter,
	} from '$lib/data/socials';
	import LinksList from '$lib/components/LinksList.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import VerticalLinksList from '$lib/components/VerticalLinksList.svelte';
	import { IconCoins } from '@tabler/icons-svelte';
</script>

<MetaTags
	pageName="Contact - Clembs"
	description="View all ways you can contact me, view my work or donate to support my work."
/>

<main>
	<header>
		<img src="/assets/logo-purplue.webp" width={64} height={64} alt="Clembs' logo" />

		<h1>Connect with me</h1>
	</header>

	<section id="chat">
		<h2>Chat</h2>

		<LinksList socials={[email, discord]} />
	</section>

	<section id="pro">
		<h2>Professional</h2>

		<LinksList socials={[resume, github]} />
	</section>

	<section id="social">
		<h2>Social media</h2>

		<VerticalLinksList socials={[bluesky, twitter, instagram]} />
	</section>

	<section id="donate">
		<h2>Donate</h2>

		<LinksList
			socials={[
				kofi,
				boosty,
				{
					name: 'Donation History',
					href: '/donate',
					icon: IconCoins,
				},
			]}
		/>
	</section>

	<!-- <h2>Misc</h2>

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
	/> -->
</main>

<style lang="scss">
	main {
		padding: 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		gap: 1rem;

		header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 1.5rem;

			img {
				border-radius: 50%;
				border: 2px solid var(--color-outline);
				box-shadow: 2px 2px 0px 0px var(--color-outline);
			}
		}

		section {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h2 {
				font-size: 1rem;
			}
		}
	}
</style>
