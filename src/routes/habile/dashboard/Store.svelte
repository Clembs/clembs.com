<script lang="ts">
	import Product from './Product.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<section id="add-funds">
	<h2>Get more Hydrollars</h2>

	<p>
		Habile Chat uses advanced AI powered by GPT-4, which costs me money to operate. In order to get
		more conversations with Habile, you will need to buy more Hydrollars. Hydrollars are the virtual
		currency used to pay for chatting with Habile.
	</p>

	<ul class="products">
		{#each data.products.data.sort((a, b) => Number(a.default_price) - Number(b.default_price)) as product}
			{@const price = data.prices.data.find((price) => price.product === product.id)}

			<Product {product} {price} />
		{/each}
	</ul>
</section>

<style lang="scss">
	.products {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		list-style: none;
		padding: 0;
		gap: 0.5rem;
	}
</style>
