<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { BrandingPost, Technology } from '$lib/data/branding';
	import Clembs from '$lib/icons/Clembs.svelte';
	import Wordmark from '$lib/icons/Wordmark.svelte';
	import InfoCard from './InfoCard.svelte';

	export let data: BrandingPost;

	const baseUrl = 'https://c.clembs.com/branding';

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

<main>
	<InfoCard {data} />

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
</main>

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

	main {
		display: flex;
		flex-direction: row-reverse;
		gap: 1rem;
	}

	@media (max-width: 850px) {
		main {
			flex-direction: column;
		}
	}
</style>
