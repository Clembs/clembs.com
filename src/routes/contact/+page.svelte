<script lang="ts">
	import { SocialName, chatting, microblogging, socials } from '$lib/data/socials';
	import { IconHeart, IconVideo } from '@tabler/icons-svelte';
	import LinksList from '$lib/components/LinksList.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import VerticalLinksList from '$lib/components/VerticalLinksList.svelte';
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

	<h2>Chat</h2>

	<LinksList socials={chatting} />

	<h2>Microblogging</h2>

	<VerticalLinksList socials={microblogging} />

	<h2>Other socials</h2>

	<LinksList {socials} />

	<h2>Misc</h2>

	<LinksList
		socials={[
			{
				id: SocialName.Kofi,
				name: 'Donate',
				url: '/donate',
				icon: IconHeart,
				description: 'Support me and my work',
			},
			{
				id: SocialName.Twitch,
				name: 'Streaming',
				url: '/stream',
				icon: IconVideo,
				description: 'I sometimes code, design and play games live.',
				activity: 'medium',
			},
		]}
	/>
</main>

<style lang="scss">
	main {
		padding: 1rem 1rem 2rem 1rem;
		display: flex;
		flex-direction: column;
		max-width: 500px;
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
			}
		}

		h2 {
			font-size: 1rem;
		}
	}
</style>
