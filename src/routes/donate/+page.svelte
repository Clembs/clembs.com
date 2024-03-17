<script lang="ts">
	import LinksList from '$lib/components/LinksList.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { donationLinks } from '$lib/data/socials';
	import Supporter from '$lib/icons/badges/supporter.svelte';
	import Mention from '../comments/Comment/Mention.svelte';
	import type { PageServerData } from './$types';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import type { donations } from '$lib/db/schema';
	import { IconAt } from '@tabler/icons-svelte';

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
		SUB: 'month(s) of subscription',
	};
</script>

<main>
	<header>
		<div class="big-icon">💦</div>
		<h1>Buy me some water!</h1>
	</header>

	<p>
		Water being the essence of life, it powers my personal projects and my life, because coffee,
		sugary or energy drinks and alcohol are overrated.
		<br /> Since my projects are and will remain as free, open-source and ad-free <Tooltip>
			<span slot="tooltip-content">
				Some platforms may have ads I can't control, and some projects may depend on paid 3rd party
				services.
			</span>
			<dfn>as possible</dfn>
		</Tooltip>, consider buying me some water as a thank you.
	</p>

	<section id="links">
		<h2>Ways to donate:</h2>

		<LinksList socials={donationLinks} />
	</section>

	<section id="qna">
		<h2>Perks</h2>

		<p>
			Thank you for showing interest in donating to me :D. By donating, you get minor free things
			like:
		</p>

		<ul>
			<li>
				A fancy
				<span class="icon"><Supporter /></span>
				badge next to your username in Comments
			</li>
			<li>
				A sexy <Mention
					node={{ type: 'other', text: '💦 Supporters', color: '#cdf2ff', icon: IconAt }}
					clickable={false}
				/> role on my <a href="/discord" target="_blank">Discord server</a>
			</li>
			<li>You appear on the donation history!</li>
			<li>Appear in credits for ongoing and upcoming projects</li>
			<li>My E T E R N A L gratitude</li>
		</ul>
	</section>

	<section id="history">
		<h2>Donation history</h2>

		<p>
			I owe these people EVERYTHING and I thank them very much. This section is updated manually, so
			it may not be up to date. Note that subscription renewals are not shown, and the amount shown
			is what people give me, not what I receive after tax.
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
							{#if donation.user}
								<Mention node={{ type: 'user', username: donation.user.username }} />
							{:else}
								{donation.username}
							{/if}
						</td>
						<td>
							{donation.amount.toFixed(2)}
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
		padding: 1rem;
		flex-direction: column;
		overflow-y: scroll;

		header {
			text-align: center;
			.big-icon {
				font-size: 5rem;
			}
		}

		section {
			margin-top: 2rem;
		}
		// background-color: #cdf2ff;

		.icon :global(svg) {
			width: 1rem;
			height: 1rem;
		}

		h1,
		p,
		h2 {
			margin-bottom: 1rem;
		}

		ul {
			margin-top: 0;
		}
	}
</style>
