<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Emoji from '$lib/components/Emoji.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div role="main">
	<img src="/assets/hydrollar.webp" alt="Hydrollar" height={64} width={64} />

	<h1>Thank you for your purchase!</h1>

	<p>
		Your account was credited with <strong>
			<Emoji src="/assets/hydrollar.webp" name="hydrollar" />
			{data.product?.metadata.value} Hydrollars
		</strong>!
	</p>

	<div class="details">
		<h2>Balance</h2>

		<div class="details-list">
			<div class="detail">
				<span class="key">Previous</span>
				<span class="value red">
					{Math.round(
						(data.userData?.habileChatData?.tokens || 0) * 100 -
							Number(data.product?.metadata.value)
					)} Hydrollars
				</span>
			</div>

			<div class="detail">
				<span class="key">New</span>
				<span class="value green">
					{Math.floor((data.userData?.habileChatData?.tokens || 0) * 100)} Hydrollars
				</span>
			</div>
		</div>
	</div>

	<div class="details">
		<h2>Order details</h2>

		<div role="complementary" class="details-list">
			<div class="detail">
				<span class="key">Order ID</span>
				<span class="value">{data.session?.id}</span>
			</div>

			<div class="detail">
				<span class="key">Product</span>
				<span class="value">{data.product?.name}</span>
			</div>

			<div class="detail">
				<span class="key">Product ID</span>
				<span class="value">{data.product?.id}</span>
			</div>

			<div class="detail">
				<span class="key">Date</span>
				<span class="value">{new Date(data.session?.created * 1000).toLocaleDateString()}</span>
			</div>

			<div class="detail">
				<span class="key">Subtotal</span>
				<span class="value">
					{((data.session?.amount_subtotal || 0) / 100).toFixed(2)}
					{data.session?.currency?.toUpperCase()}
				</span>
			</div>

			<div class="detail">
				<span class="key">Tax</span>
				<span class="value">
					{((data.session?.total_details?.amount_tax || 0) / 100).toFixed(2)}
					{data.session?.currency?.toUpperCase()}
				</span>
			</div>

			<div class="detail total">
				<span class="key">Total</span>
				<span class="value">
					{((data.session?.amount_total || 0) / 100).toFixed(2)}
					{data.session?.currency?.toUpperCase()}
				</span>
			</div>
		</div>
	</div>

	<p>
		I've also sent the details to <strong>{data.session?.customer_email}</strong> so you can keep them
		for your records or if anything goes wrong.
	</p>

	<Button href="/habile/dashboard">Back to dashboard</Button>

	<p class="subtext">
		Not refundable. Question about your purchase, or you didn't receive your Hydrollars? <a
			href="mailto:clembs@clembs.com"
		>
			Contact me
		</a>.
	</p>
</div>

<style lang="scss">
	div[role='main'] {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		text-align: center;

		h1 {
			font-size: 1.75rem;
		}

		.details {
			width: 100%;
			max-width: 40rem;

			border-radius: 1rem;
			box-shadow: 0 2px 0 0 var(--color-outline);
			border: 1px solid var(--color-outline);
			padding: 1rem;

			h2 {
				font-size: 1.5rem;
			}

			.details-list {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				margin-top: 1rem;
				width: 100%;

				.detail {
					display: flex;
					justify-content: space-between;

					&.total {
						font-size: 1.25rem;
						font-family: inherit;
						.value {
							font-weight: 500;
						}
					}

					font-family: monospace;
					.key {
						text-transform: uppercase;
						font-weight: 600;
					}
					.value {
						word-break: break-all;

						&.green {
							color: var(--color-success);
							font-weight: 600;
							font-size: 1rem;
						}

						&.red {
							color: var(--color-error);
							font-weight: 600;
							font-size: 1rem;
						}
					}
				}
			}
		}

		.subtext {
			font-size: 0.75rem;
			opacity: 0.9;
		}
	}

	@media (max-width: 768px) {
		div[role='main'] {
			.details {
				.details-list {
					.detail {
						flex-direction: column !important;
						text-align: left;
					}
				}
			}
		}
	}
</style>
