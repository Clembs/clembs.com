<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main
	style="
  --color-background: {data?.themeColors?.background};
  --color-accent: {data?.themeColors?.accent};
"
>
	<div class="heading">
		<img src="https://c.clembs.com/branding/{data.id}/{data.wordmarkPath}" alt={data.projectName} />

		<div class="text">
			<div class="title">{data.title}</div>
			<div class="heading-time">
				<time datetime={data.finishedAt.toDateString()}>
					{data.finishedAt.toLocaleString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})}
				</time>
				• TTM: {(data.finishedAt.getTime() - data.createdAt.getTime()) / 86_400_000} days
			</div>
		</div>

		<Tags tags={[data.type === 'branding' ? 'Branding' : 'UI Design', ...data.tags]} />
	</div>

	<div class="content">
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
		<div class="description">
			<div class="inner">
				<h2>Description</h2>
				<p>
					{@html data.description}
				</p>

				{#if data.assetsZipPath}
					<Button href={data.assetsZipPath} background={data.themeColors.accent}
						>Download assets</Button
					>
				{/if}
				{#if data.productURL}
					<Button href={data.productURL} background={data.themeColors.accent}>Check it out!</Button>
				{/if}
			</div>
		</div>
	</div>

	<p>
		&copy; {data.finishedAt.getFullYear()}-{new Date().getFullYear()}

		{#if data.credits}
			Clembs & {#each data.credits as { href, label }}<a {href}>{label}</a>{/each}.
		{:else}
			Clembs.
		{/if}
		All rights reserved.
	</p>
</main>

<style lang="scss">
	main {
		background: var(--color-background);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50px;

		.heading {
			.title {
				font-size: 42px;
				font-weight: 500;
			}
			img {
				max-width: 300px;
			}
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 20px;
		}

		.content {
			display: flex;
			padding: 10px;
			gap: 25px;

			.description {
				width: 100%;
				margin-top: 20px;
				position: relative;

				.inner {
					position: sticky;
					top: 0;
				}
			}

			.assets {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				gap: 10px;

				.asset-group {
					display: flex;
					width: 100%;
					gap: 10px;

					img {
						border-radius: 10px;
					}
				}
			}
		}

		@media screen and (max-width: 950px) {
			.content {
				flex-direction: column-reverse;
			}
		}
	}
</style>
