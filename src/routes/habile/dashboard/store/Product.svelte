<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type StripeAPI from 'stripe';
	import { enhance } from '$app/forms';

	export let product: StripeAPI.Product;
	export let price: StripeAPI.Price | undefined;

	let form: HTMLFormElement;

	let recommendedValue = product.metadata.value === '200';
</script>

<li>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<form
		bind:this={form}
		use:enhance
		action="?/createCheckoutSession"
		method="post"
		on:click={() => form.submit()}
		class:best-value={recommendedValue}
	>
		<input type="hidden" name="priceId" value={price?.id} />

		<header>
			<img src="/assets/hydrollar.webp" alt="Hydrollar" height={32} width={32} />
			<h3>
				{product.name.replace('Hydrollars', '')}
			</h3>
		</header>

		<p class="subtext">
			About
			{Math.round((Number(product.metadata.value) / 4 + Number(product.metadata.value) / 3) / 2)}
			messages<sup>1</sup> to send to Habile!
		</p>

		<Button style={recommendedValue ? 'filled' : 'outlined'} type="submit" inline={false}>
			{((price?.unit_amount || 0) / 100).toFixed(2)}
			{price?.currency?.toUpperCase()}
		</Button>
	</form>
	{#if recommendedValue}
		<p class="best-value-tag">Best value</p>
	{/if}
</li>

<style lang="scss">
	li {
		list-style: none;
		margin: 0;

		.best-value-tag {
			position: relative;
			font-size: 1.125rem;
			font-weight: 500;
			background-color: var(--color-on-background);
			color: var(--color-background);
			text-align: center;
			margin-top: -2rem;
			z-index: -1;
			padding: 2.25rem 0 0.5rem 0;
			border-radius: 0 0 1.5rem 1.5rem;
		}

		form {
			position: relative;
			display: flex;
			flex-direction: column;
			z-index: 1;
			align-items: center;
			gap: 0.5rem;
			padding: 0.75rem;
			border-radius: 1.5rem;
			box-shadow: 0 2px 0 0 var(--color-outline);
			border: 1px solid var(--color-outline);
			user-select: none;
			cursor: pointer;
			transition:
				transform 0.1s ease-in-out,
				box-shadow 0.1s ease-in-out;

			header {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				h3 {
					font-size: 1.75rem;
				}
			}

			p {
				margin-bottom: 0.5rem;
			}

			&:hover {
				transform: translateY(-3px);
				box-shadow: 0 5px 0 0 var(--color-outline);
			}

			&:active {
				transform: translateY(2px);
				box-shadow: 0 0px 0 0 var(--color-outline);
				background-color: var(--color-surface);
			}

			&.best-value {
				background-color: var(--color-surface);
				border: 2px solid var(--color-outline);
			}
		}
	}
</style>
