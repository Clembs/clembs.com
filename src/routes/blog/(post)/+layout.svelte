<script lang="ts">
	import {
		IconX,
		IconBrandDribbble,
		IconBrandBehance,
		IconBrandInstagram,
		IconMessageCircle,
	} from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import { softwareData } from '$lib/data/software';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { LayoutServerData } from './$types';
	import Comments from '../../comments/Comments.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';

	export let data: LayoutServerData;
</script>

<svelte:head>
	<style src="../../../styles/showcase.scss"></style>
</svelte:head>

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
			<img
				width={32}
				height={32}
				draggable="false"
				alt="Clembs logo"
				src="/assets/logo-purplue.webp"
				title="That's me!"
			/>
		</div>
		<IconX size={16} />
		<div class="the-guys-im-working-for">
			<img
				width={32}
				height={32}
				draggable="false"
				alt={data.brand}
				src={data.iconPath}
				title={data.brand}
			/>
		</div>
	</div>

	<h1 class="post-title">{data.title}</h1>

	<time class="subtext" datetime={data.createdAt.toDateString()}>
		{data.createdAt.toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})}
	</time>

	<div class="buttons">
		{#if data.links?.projectUrl}
			<Button href={data.links?.projectUrl}>
				Check it out
				<IconExternalLink />
			</Button>
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
				<IconBrandBehance />
			</Button>
		{/if}
		{#if data.links?.dribbble}
			<Button style="outlined" href={data.links?.dribbble}>
				<IconBrandDribbble />
			</Button>
		{/if}
		{#if data.links?.instagram}
			<Button style="outlined" href={data.links?.instagram}>
				<IconBrandInstagram />
			</Button>
		{/if}
		<Button style="outlined" href="#comments" aria-label="Comments">
			<IconMessageCircle />
		</Button>
		<ShareButton url={$page.url.href} />
	</div>
</header>

<article>
	<slot />
</article>

<Comments projectId="{data.type}/{data.id}" comments={data.comments} userData={data.userData} />

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		margin: 1rem;
		margin-bottom: 2rem;

		.brands {
			display: flex;
			gap: 0.25rem;
			align-items: center;
			margin-bottom: 0.5rem;

			.me,
			.the-guys-im-working-for {
				:global(svg),
				img {
					border-radius: 999rem;
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
