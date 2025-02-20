<script lang="ts">
	import { page } from '$app/state';
	import type { Article } from '$lib/data/blog-articles';

	interface Props {
		pageName?: string;
		description: string;
		image?: string;
		siteName?: string;
		article?: Article | null;
		themeColor?: string;
	}

	let {
		pageName = 'Clembs',
		description,
		image = '/banner.png',
		siteName = 'Clembs',
		article = null,
		themeColor = '#987fff',
	}: Props = $props();
	const favicon = '/favicon.png';
</script>

<svelte:head>
	<title>{pageName}</title>
	<meta name="author" content={siteName} />
	<meta name="title" content={pageName} />
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<meta property="theme-color" content={themeColor} />
	<meta name="copyright" content="&copy;{new Date().getFullYear()} Clembs" />
	<!-- Google index -->
	<meta name="”robots”" content="”follow,index”" />
	<meta name="”googlebot”" content="”follow,index”" />
	<link rel="canonical" href={page.url.href} />
	<!-- OpenGraph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={pageName} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ClembsV" />
	<meta name="twitter:title" content={pageName} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<meta name="twitter:image" content={image} />
	<!-- Article stuff -->
	{#if article}
		<meta name="byl" content="By Clément Voisin" />
		<meta name="article:author" content="Clément Voisin" />
		<meta name="pubdate" content={article.createdAt.toISOString()} />
		<meta property="article:published_time" content={article.createdAt.toISOString()} />
		<!-- {#if article.tags?.length}
			<meta name="keywords" content={article.tags.join(', ')} />
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if} -->
		<meta property="article:section" content="Blog" />
		<link
			rel="alternate"
			type="application/json+oembed"
			href="{page.url.origin}/oembed/blog/{article.categoryId}/{article.slug}"
			title={article.title}
		/>
	{/if}
	<!-- Icons -->
	<meta name="image" content={image} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>
