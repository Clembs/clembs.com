<script lang="ts">
	import LinksList from '$lib/components/LinksList.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { boosty, kofi } from '$lib/data/socials';
	import type { PageServerData } from './$types';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import type { donations } from '$lib/db/schema';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import { IconHeart } from '@tabler/icons-svelte';

	export let data: PageServerData;

	const platformNames: Record<typeof donations.$inferSelect.platform, string> = {
		KOFI: 'Ko-fi',
		PAYPAL: 'PayPal',
		BOOSTY: 'Boosty',
		BUYMEACOFFEE: 'Buy Me A Coffee',
		TWITCH: 'Twitch',
		OTHER: 'Other',
	};

	const currencyNames: Record<string, string> = {
		RUB: '₽',
		USD: 'US$',
		EUR: '€',
		BIT: 'Bit(s)',
		SUB: 'new subscription',
	};
</script>

<MetaTags
	pageName="Donate - Clembs"
	description="Since my projects are free, consider buying me some water as a thank you!"
/>

<main>
	<header>
		<IconHeart size={64} />
		<h1>Support my free & open-source work</h1>
	</header>

	<p>
		Since my projects are and will remain as free, open-source and ad-free <Tooltip>
			<span slot="tooltip-content">
				Some platforms I use may have ads I can't control, and some projects may depend on paid 3rd
				party services.
			</span>
			<dfn>as possible</dfn>
		</Tooltip>, consider donating as a thank you. In return, you'll be listed here and on any future
		personal projects.
	</p>

	<section id="links">
		<h2>Ways to donate:</h2>

		<LinksList socials={[kofi, boosty]} />
	</section>

	<section id="history">
		<h2>Special thanks to donators</h2>

		<p>
			I owe these people EVERYTHING and I thank them very much. This section is updated manually,
			but I try to update it as much as I can.<br />
			Note: subscription renewals are not shown, and the amount shown is what people give me, not what
			I receive after tax.
		</p>

		<Table>
			<thead>
				<tr>
					<th>Username</th>
					<th>Amount</th>
					<th>Platform</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{#each data.donations as donation}
					<tr>
						<td>
							{donation.username}
						</td>
						<td>
							{#if donation.currency !== 'SUB'}
								{donation.amount.toFixed(2)}
							{:else}
								{donation.amount}
							{/if}
							{currencyNames[donation.currency]}
							{#if donation.isSubscription}
								<span class="subtext"> (new subscription)</span>
							{/if}
						</td>
						<td>{platformNames[donation.platform]}</td>
						<td>{dateFormat(new Date(donation.createdAt), false)}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</section>
</main>

<style lang="scss">
	main {
		display: flex;
		padding: 2rem 1rem;
		flex-direction: column;
		overflow-y: scroll;

		header {
			text-align: center;
			text-wrap: balance;
		}

		section {
			margin-top: 2rem;
		}

		h1,
		p,
		h2 {
			margin-bottom: 1rem;
		}
	}
</style>
