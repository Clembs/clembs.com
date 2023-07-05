<script lang="ts">
	import '../../../styles/showcase.scss';
	import type { BrandingPost } from '$lib/data/branding';
	import IconPlus from '@tabler/icons-svelte/dist/svelte/icons/IconPlus.svelte';
	import IconDribbble from '@tabler/icons-svelte/dist/svelte/icons/IconBrandDribbble.svelte';
	import IconBehance from '@tabler/icons-svelte/dist/svelte/icons/IconBrandBehance.svelte';
	import IconInstagram from '@tabler/icons-svelte/dist/svelte/icons/IconBrandInstagram.svelte';
	import Button from '$lib/components/Button.svelte';
	import { softwareData } from '$lib/data/software';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';

	export let data: BrandingPost;
</script>

<MetaTags
	pageName={data.title}
	description="{data.category} • {data.createdAt.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})}"
	image={data.bannerPath}
/>

<header>
	<div class="brands">
		<div class="me">
			<img draggable="false" alt="Clembs logo" src="/assets/logo-purplue.webp" />
		</div>
		<IconPlus size={24} />
		<div class="the-guys-im-working-for">
			<img draggable="false" alt={data.brand} src={data.iconPath} />
		</div>
	</div>

	<h1 class="post-title">{data.title}</h1>

	<span class="subtext">
		{data.category} •
		<time datetime={data.createdAt.toDateString()}>
			{data.createdAt.toLocaleString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})}
		</time>
	</span>

	<div class="buttons">
		{#if data.links?.projectUrl}
			<Button href={data.links?.projectUrl}>Check it out</Button>
		{/if}
		{#if data.links?.assetsUrl}
			<Button style="outlined" href={data.links?.assetsUrl}>View assets</Button>
		{/if}
		{#if data.relatedSoftwareId}
			{@const relatedSoftware = softwareData.find(({ id }) => data.relatedSoftwareId === id)}
			<Button style="outlined" href="/software/{relatedSoftware?.id}">
				<img
					class="related-software-icon"
					draggable="false"
					src={relatedSoftware?.iconThumbnailPath}
					alt="{relatedSoftware?.name} icon"
				/>
				Related software: {relatedSoftware?.name}
			</Button>
		{/if}
		{#if data.links?.behance}
			<Button style="outlined" href={data.links?.behance}>
				<IconBehance />
			</Button>
		{/if}
		{#if data.links?.dribbble}
			<Button style="outlined" href={data.links?.dribbble}>
				<IconDribbble />
			</Button>
		{/if}
		{#if data.links?.instagram}
			<Button style="outlined" href={data.links?.instagram}>
				<IconInstagram />
			</Button>
		{/if}
		<ShareButton url={$page.url.href} />
	</div>
</header>

<article>
	<slot />
</article>

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		border-bottom: 1px solid var(--color-on-background);
		padding: 2rem;

		.brands {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			margin-bottom: 0.5rem;

			.me,
			.the-guys-im-working-for {
				height: 3rem;
				:global(svg),
				img {
					border-radius: 999rem;
					width: auto;
					height: 3rem;
					border: 1px solid var(--color-on-background);
				}
			}
		}

		.post-title {
			font-size: clamp(1.5rem, 5vw, 2rem);
			margin: 0;
			text-wrap: balance;
		}

		.buttons {
			margin-top: 0.75rem;
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;

			.related-software-icon {
				width: 24px;
				height: 24px;
				border-radius: 999rem;
			}
		}
	}
</style>
