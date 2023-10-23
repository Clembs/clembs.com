<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type StripeAPI from 'stripe';
	import { enhance } from '$app/forms';

	export let product: StripeAPI.Product;
	export let price: StripeAPI.Price | undefined;

	let form: HTMLFormElement;
</script>

<li>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<form
		bind:this={form}
		use:enhance
		action="?/createCheckoutSession"
		method="post"
		on:click={() => form.submit()}
	>
		<input type="hidden" name="priceId" value={price?.id} />

		<img src="/assets/hydrollar.webp" alt="Hydrollar" height={48} width={48} />
		<h3>{product.name}</h3>

		<p>
			About
			{Math.round((Number(product.metadata.value) / 4 + Number(product.metadata.value) / 3) / 2)}
			messages<sup>1</sup> to send to Habile!
		</p>

		<Button type="submit" inline={false}>
			{((price?.unit_amount || 0) / 100).toFixed(2)}
			{price?.currency?.toUpperCase()}
		</Button>
	</form>
</li>

<style lang="scss">
	li {
		list-style: none;

		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.75rem;
			padding: 1rem;
			border-radius: 1rem;
			box-shadow: 0 2px 0 0 var(--color-outline);
			border: 1px solid var(--color-outline);
			user-select: none;
			cursor: pointer;
			transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

			h3 {
				font-size: 1.75rem;
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
			}
		}
	}
</style>
