<script lang="ts">
	import { IconMessageCircle } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { LayoutServerData } from './$types';
	import Comments from '../../comments/Comments.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import '/src/styles/blog.scss';

	export let data: LayoutServerData;
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
	<Breadcrumbs
		data={[
			{
				href: '/blog',
				name: 'Blog',
			},
			{
				href: `/blog/${data.categoryId}`,
				name: data.category.name,
			},
			{
				href: `/blog/${data.categoryId}/${data.id}`,
				name: data.title,
			},
		]}
	/>
	<!-- <div class="brands">
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
	</div> -->
	{#if data.bannerPath}
		<img
			class="post-banner"
			src={data.bannerPath}
			alt="{data.title} banner"
			style="background-image: url({data.bannerThumbnailPath});"
		/>
	{/if}

	<h1 class="post-title">{data.title}</h1>

	<div class="post-info">
		<div class="post-author">
			<img
				width={32}
				height={32}
				draggable="false"
				alt="Clembs logo"
				src="/assets/logo-purplue.webp"
			/>
			<div class="author-text">
				<div class="author-name">Clembs</div>
				<time class="subtext" datetime={data.createdAt.toDateString()}>
					{data.createdAt.toLocaleString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
				</time>
			</div>
		</div>

		<div class="post-buttons">
			{#if data.links?.projectUrl}
				<Button href={data.links?.projectUrl}>
					Check it out
					<IconExternalLink />
				</Button>
			{/if}
			{#if data.links?.assetsUrl}
				<Button style="outlined" href={data.links?.assetsUrl}>View assets</Button>
			{/if}
			<!-- {#if data.links?.behance}
				<Button icon style="outlined" href={data.links?.behance}>
					<IconBrandBehance />
				</Button>
			{/if}
			{#if data.links?.dribbble}
				<Button icon style="outlined" href={data.links?.dribbble}>
					<IconBrandDribbble />
				</Button>
			{/if}
			{#if data.links?.instagram}
				<Button icon style="outlined" href={data.links?.instagram}>
					<IconBrandInstagram />
				</Button>
			{/if} -->
			<Button style="outlined" href="#comments" aria-label="Comments">
				<IconMessageCircle />
				{data.comments.length}
			</Button>
			<ShareButton url={$page.url.href} />
		</div>
	</div>
</header>

<article>
	<slot />
</article>

<Comments
	projectId="blog/{data.categoryId}/{data.id}"
	comments={data.comments}
	userData={data.userData}
/>

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		margin: 1rem;
		margin-bottom: 2rem;

		.post-banner {
			width: 100%;
			border-radius: 1rem;
			margin-bottom: 1rem;
			border: 1px solid var(--color-outline);
			box-shadow: 0px 2px 0 0 var(--color-outline);
		}

		.post-info {
			display: flex;
			justify-content: space-between;
			margin: 0.5rem 0;

			.post-author {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				img {
					border-radius: 999rem;
					border: 1px solid var(--color-on-background);
				}

				.author-text {
					display: flex;
					flex-direction: column;

					.author-name {
						font-weight: 500;
					}
				}
			}

			.post-buttons {
				display: flex;
				align-items: center;
				gap: 0.25rem;
			}
		}

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
	}
</style>
