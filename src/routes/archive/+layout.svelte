<script lang="ts">
	import { softwarePlatforms } from '$lib/data/archive';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { LayoutServerData } from './$types';
	import Comments from '../comments/Comments.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';
	import '../../styles/blog.scss';
	import { IconMessageCircle } from '@tabler/icons-svelte';

	let expandOtherDownloads = false;

	export let data: LayoutServerData;
</script>

<MetaTags
	pageName={data.name}
	description="{data.brief} •
	{data.createdAt.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})}"
/>

<header>
	<div class="about">
		<img src={data.iconPath} height={58} width={58} alt={data.name} />

		<div class="text">
			<h1 class="title">{data.name}</h1>

			<span class="subtext">
				<time datetime={data.createdAt.toDateString()}>
					{data.createdAt.toLocaleString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
				</time>
			</span>
		</div>
	</div>

	<div class="buttons">
		{#if (data.links?.downloadUrl || data.links?.downloadUrls) && data.platforms}
			<Button href={data.links.downloadUrl || data.links?.downloadUrls?.[0]?.url}>
				Download for {softwarePlatforms[
					data.links?.downloadUrls?.[0]?.platform || data.platforms[0]
				]}
			</Button>
		{/if}
		{#if data.links?.versionHistory || data.links?.downloadUrls}
			<Button style="outlined" on:click={() => (expandOtherDownloads = !expandOtherDownloads)}>
				Other downloads
			</Button>
		{/if}
		{#if data.links?.projectUrl}
			<Button href={data.links?.projectUrl} aria-label="Check it out">
				Check it out
				<IconExternalLink />
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

<Comments projectId="archive/{data.id}" comments={data.comments} userData={data.userData} />

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin: 1rem;
		margin-bottom: 2rem;

		.about {
			display: flex;
			align-items: center;
			gap: 1rem;

			img {
				border-radius: 1rem;
				border: 1px solid var(--color-outline);
				box-shadow: 0 2px 0 0 var(--color-outline);
			}
		}

		.title {
			font-size: clamp(1.5rem, 5vw, 2rem);
			margin: 0;
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem;
			align-items: center;
		}
	}

	@media (max-width: 768px) {
		header {
			flex-direction: column;
			text-align: center;
			gap: 1rem;

			.about {
				flex-direction: column;
				gap: 0.5rem;
			}

			.buttons {
				justify-content: center;
			}
		}
	}
</style>
