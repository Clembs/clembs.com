<script lang="ts">
	import { page } from '$app/stores';

	export let pageName: string = '';
	export let description: string;
	export let image = '/banner.png';
	let title = pageName ? `${pageName} | Clembs` : 'Clembs | Portfolio Website';
	const site_name = 'Clembs';
	const baseUrl = $page.url.host;
	const favicon = '/favicon.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="author" content={site_name} />
	<meta name="title" content={title} />
	{#if description} <meta name="description" content={description} /> {/if}
	<meta name="copyright" content="&copy;{new Date().getFullYear()} Clembs" />
	<!-- Google index -->
	<meta name="”robots”" content="”follow,index”" />
	<meta name="”googlebot”" content="”follow,index”" />
	<link rel="canonical" href={baseUrl} />
	<!-- OpenGraph -->
	<meta property="og:site_name" content={site_name} />
	<meta property="og:title" content={title} />
	{#if description} <meta property="og:description" content={description} /> {/if}
	<meta property="og:url" content="{baseUrl}{$page.url.pathname}" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={site_name} />
	<meta name="twitter:title" content={title} />
	{#if description} <meta name="twitter:description" content={description} /> {/if}
	<meta name="twitter:image" content={image} />
	<!-- Icons -->
	<meta name="image" content={image} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>
