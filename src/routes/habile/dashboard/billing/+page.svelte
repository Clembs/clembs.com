<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { useCopy } from '$lib/components/useShare';
	import { dateFormat } from '$lib/helpers/dateFormat';

	export let data;
</script>

<main>
	<h1>Purchase history</h1>

	<p>
		Here you can see all of your Habile Chat purchases. Missing something, or a purchase didn't go
		through? Please contact me at
		<a href="mailto:clembs@clembs.com"> clembs@clembs.com </a>.<br />
		Note: Purchases made with Boosty and monthly subscriptions are not shown here.
	</p>

	<Button href="/habile/dashboard/store">Get more Hydrollars</Button>

	{#if !data.userData?.purchases.length}
		<p class="status">You have made no purchases yet.</p>
	{:else}
		<Table>
			<tr>
				<th>Date</th>
				<th>Product</th>
				<th>Transaction ID</th>
				<th>Amount</th>
			</tr>
			{#each data.userData.purchases.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) as purchase}
				{@const product = (purchase.productId &&
					data.products.data.find((p) => p.id === purchase.productId)) || {
					name: 'Unknown',
					metadata: {
						value: 0,
					},
				}}
				<tr>
					<td>
						{dateFormat(purchase.createdAt, false)}
					</td>
					<td class="product">
						{#if product.name.endsWith('Hydrollars')}
							<img src="/assets/hydrollar.webp" alt="Hydrollar" height={24} width={24} />
						{/if}
						{product.name}
					</td>
					<td>
						<Tooltip>
							<span slot="tooltip-content"> Copy to clipboard </span>
							<button on:click={() => useCopy(purchase.checkoutSessionId)}>
								<code>
									{purchase.checkoutSessionId.slice(0, 15)}...
								</code>
							</button>
						</Tooltip>
					</td>
					<td>
						{((purchase.amount || 0) / 100).toFixed(2)}
						{purchase.currency?.toUpperCase() || 'USD'}
					</td>
				</tr>
			{/each}
		</Table>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;

		.product {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
</style>
