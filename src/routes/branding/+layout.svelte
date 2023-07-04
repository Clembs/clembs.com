<script lang="ts">
	import '../../styles/showcase.scss';
	import type { BrandingPost } from '$lib/data/branding';
	import Clembs from '$lib/icons/Clembs.svelte';
	import IconX from '@tabler/icons-svelte/dist/svelte/icons/IconX.svelte';
	import InfoCard from './InfoCard.svelte';

	export let data: BrandingPost;
</script>

<header>
	<div class="brands">
		<div class="me">
			<Clembs />
		</div>
		{#if data.isCommission}
			<IconX size={24} />
			<div class="the-guys-im-working-for">
				<img draggable="false" alt={data.brand} src={data.iconPath} />
			</div>
		{/if}
	</div>
	<h1 class="post-title">{data.title}</h1>
</header>

<main>
	<InfoCard {data} />

	<div class="content">
		<slot />
	</div>
</main>

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		border-bottom: 1px solid var(--color-on-background);
		padding: 1.4rem;
		padding-top: 2rem;

		.brands {
			display: flex;
			gap: 0.75rem;
			align-items: center;
			margin-bottom: 0.5rem;

			.me,
			.the-guys-im-working-for {
				height: 2.5rem;
				:global(svg),
				img {
					width: auto;
					height: 2.5rem;
				}
			}
		}

		.post-title {
			font-size: 2rem;
			margin: 0;
			text-wrap: balance;
		}
	}

	.content {
		margin: 1.5rem;
		margin-top: 0.5rem;
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
			margin: 0 1rem 1rem 1rem;
		}

		.content {
			margin: 0.5rem;
			margin-top: 1rem;
		}

		.post-title {
			font-size: 2rem;
		}
	}
</style>
