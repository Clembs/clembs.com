<script lang="ts">
	import type { BrandingPost } from '$lib/data/branding';
	import Clembs from '$lib/icons/Clembs.svelte';
	import InfoCard from './InfoCard.svelte';

	export let data: BrandingPost;

	const baseUrl = 'https://c.clembs.com/branding';

	function getUrl(url: string) {
		return `${baseUrl}/${data.id}${url}`;
	}
</script>

<header>
	<div class="brands">
		<div class="me">
			<Clembs />
		</div>
		{#if data.isCommission}
			x
			<div class="the-guys-im-working-for">
				<img alt={data.brand} src={getUrl(data.iconPath)} />
			</div>
		{/if}
	</div>
	<h1 class="post-title">{data.title}</h1>
</header>

<main>
	<InfoCard {data} />

	<div class="content">
		<slot />
		<!-- <div class="description">
			<div class="inner">
				<p>
					{@html data.brief}
				</p>
			</div>
		</div>

		<div class="assets" role="list">
			{#each data.assets as asset_group}
				<div class="asset-group" role="row">
					{#each asset_group as asset}
						<img src="https://c.clembs.com/branding/{data.id}{asset}" alt="" />
					{/each}
				</div>
			{/each}
		</div> -->
	</div>
</main>

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		border-bottom: 1px solid black;
		padding: 1.4rem;
		padding-top: 2rem;

		.brands {
			display: flex;
			gap: 0.8rem;
			font-size: larger;
			margin-bottom: 0.5rem;

			:global(svg),
			img {
				width: auto;
				height: 2.5rem;
			}
		}

		.post-title {
			font-size: 2rem;
			margin: 0;
			font-weight: 400;
		}
	}

	.content {
		padding: 1rem;
		width: 100%;
	}

	main {
		display: flex;
		flex-direction: row-reverse;
		height: 100%;
	}

	@media (max-width: 850px) {
		main {
			flex-direction: column;
			align-items: center;
		}

		.post-title {
			font-size: 2rem;
		}
	}
</style>
