<script lang="ts">
	import Product from './Product.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<section id="add-funds">
	<h1>Get more Hydrollars</h1>

	<p>
		Habile Chat uses advanced AI powered by GPT-4, which costs me money to operate. In order to get
		more conversations with Habile, you will need to buy more Hydrollars. Hydrollars are the virtual
		currency used to pay for chatting with Habile.
	</p>

	<ul class="products">
		{#each data.products.data.sort((a, b) => Number(a.metadata.value) - Number(b.metadata.value)) as product}
			{@const price = data.prices.data.find((price) => price.product === product.id)}

			<Product {product} {price} />
		{/each}
	</ul>

	<div class="footnotes">
		<sup>1</sup> Estimate based on the average cost of a message. The real number of messages given will
		vary based on message length.
	</div>
</section>

<style lang="scss">
	#add-funds {
		display: flex;
		flex-direction: column;
		margin: 1.5rem;
		gap: 1rem;

		.products {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			list-style: none;
			padding: 0;
			gap: 0.75rem;
			margin: 0;
		}
	}

	.footnotes {
		font-size: 0.75rem;
		color: var(--color-on-surface);
	}
</style>
