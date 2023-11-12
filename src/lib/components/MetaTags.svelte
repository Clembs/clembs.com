<script lang="ts">
	import { page } from '$app/stores';

	export let pageName: string = 'Clembs | Portfolio Website';
	export let description: string;
	export let image = '/banner.png';
	export let siteName = 'Clembs';
	export let themeColor = $page.data.themeGradient?.from || '#654fff';
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
	<link rel="canonical" href={$page.url.href} />
	<!-- OpenGraph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={pageName} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={siteName} />
	<meta name="twitter:title" content={pageName} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<meta name="twitter:image" content={image} />
	<!-- Icons -->
	<meta name="image" content={image} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>
