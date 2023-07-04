<script lang="ts">
	import '../../../styles/showcase.scss';
	import type { BrandingPost } from '$lib/data/branding';
	import IconPlus from '@tabler/icons-svelte/dist/svelte/icons/IconPlus.svelte';
	import Button from '$lib/components/Button.svelte';
	import { softwareData } from '$lib/data/software';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';

	export let data: BrandingPost;
</script>

<header>
	<div class="brands">
		<div class="me">
			<img draggable="false" alt="Clembs logo" src="/assets/logo-purplue.webp" />
		</div>
		<IconPlus size={24} />
		<div class="the-guys-im-working-for">
			<img draggable="false" alt={data.brand} src={data.iconPath} />
		</div>
	</div>

	<h1 class="post-title">{data.title}</h1>

	<span class="subtext">
		{data.category} •
		<time datetime={data.createdAt.toDateString()}>
			{data.createdAt.toLocaleString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})}
		</time>
	</span>

	<div class="buttons">
		{#if data.links?.projectUrl}
			<Button href={data.links?.projectUrl}>Check it out</Button>
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
		<ShareButton url={$page.url.href} />
	</div>
</header>

<main>
	<slot />
</main>

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		border-bottom: 1px solid var(--color-on-background);
		padding: 2rem;

		.brands {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			margin-bottom: 0.5rem;

			.me,
			.the-guys-im-working-for {
				height: 3rem;
				:global(svg),
				img {
					border-radius: 999rem;
					width: auto;
					height: 3rem;
					border: 1px solid var(--color-on-background);
				}
			}
		}

		.post-title {
			font-size: 2rem;
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

	main {
		margin: 2rem;
	}

	:global(p) {
		max-width: 70ch;
	}

	@media (max-width: 850px) {
		header {
			padding: 1.25rem;
		}
		main {
			margin: 1.25rem;
			margin-top: 1.5rem;
		}

		.post-title {
			font-size: 1.75rem !important;
		}

		.buttons {
			justify-content: center;
		}
	}
</style>
