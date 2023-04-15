<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { BrandingPost, Technology } from '$lib/data/branding';
	import Clembs from '$lib/icons/Clembs.svelte';
	import Wordmark from '$lib/icons/Wordmark.svelte';

	export let data: BrandingPost;

	const baseUrl = 'https://c.clembs.com/branding';
	const technologies: Record<Technology, string> = {
		sveltekit: 'svelte',
		figma: 'figma',
		scss: 'sass',
		tailwindcss: 'tailwindcss',
		google_sites: 'google',
		illustrator: 'adobeillustrator',
		xd: 'adobexd',
		typescript: 'typescript',
		nextjs: 'nextjs'
	};

	function getUrl(url: string) {
		return `${baseUrl}/${data.id}${url}`;
	}
</script>

<header>
	<div class="brands">
		{#if !data.isCommission}
			<div class="me">
				<Clembs />
			</div>
			x
			<div class="the-guys-im-working-for">
				<img alt={data.brand} src={getUrl(data.iconPath)} />
			</div>
		{:else}
			<Wordmark />
		{/if}
	</div>
	<h1 class="post-title">{data.title}</h1>
</header>

<div class="info-card">
	<section>
		<div class="section-title">About</div>
		<span>{data.brief.split(' ').slice(0, 20).join(' ')}...</span>
	</section>
	<section>
		<div class="section-title">Created at</div>
		<time datetime={data.finishedAt.toDateString()}>
			{data.finishedAt.toLocaleString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})}
		</time>
		• Made in {(data.finishedAt.getTime() - data.createdAt.getTime()) / 86_400_000} days
	</section>
	<section>
		<div class="section-title">Technologies</div>
		<div class="technologies">
			{#each data.technologies as technology}
				<img
					src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/{technologies[technology]}.svg"
					alt={technology}
				/>
			{/each}
		</div>
	</section>
	<Button inline href={data.url}>Check it out</Button>
</div>

<div class="content">
	<div class="description">
		<div class="inner">
			<p>
				{@html data.brief}
			</p>
		</div>
	</div>

	<div class="assets" role="list">
		<h2>Gallery</h2>
		{#each data.assets as asset_group}
			<div class="asset-group" role="row">
				{#each asset_group as asset}
					<img src="https://c.clembs.com/branding/{data.id}{asset}" alt="" />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	header {
		border-radius: 20px;
		border-bottom: 1px solid black;
		padding: 1.4rem;
		padding-top: 2rem;
		background-color: white;

		.brands {
			display: flex;
			gap: 0.8rem;
			font-size: larger;
			margin-bottom: 0.5rem;

			:global(svg),
			img {
				width: 2.5rem;
				height: 2.5rem;
			}
		}

		.post-title {
			font-size: 2.2rem;
			margin: 0;
			font-weight: 600;
		}
	}

	.content {
		margin: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.info-card {
		margin: 0.5rem;
		border: 1px solid black;
		padding: 0.8rem;
		border-radius: 30px;
		position: sticky;
		top: 0;
		left: 0;
		background-color: white;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		section {
			.section-title {
				text-transform: uppercase;
				font-weight: 700;
				font-size: 0.9rem;
				padding-bottom: 0.3rem;
			}
		}
	}
</style>
