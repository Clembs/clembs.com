<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { defaultHabileChatData } from '$lib/db/HabileChatData';
	import IconPlus from '@tabler/icons-svelte/dist/svelte/icons/IconPlus.svelte';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import IconChevronRight from '@tabler/icons-svelte/dist/svelte/icons/IconChevronRight.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const habileChatData = data.userData?.habileChatData || defaultHabileChatData;
	const tokensUsed = Math.ceil(habileChatData.used * 100);
	const tokensTotal = Math.floor(habileChatData.tokens * 100);
	const tokensRemaining = tokensTotal - tokensUsed;
</script>

<main id="usage">
	<div class="title">
		<h1>Home</h1>

		<div class="split-remaining">
			<div class="remaining">
				<img src="/assets/hydrollar.webp" alt="Hydrollar" height={20} width={20} />
				{tokensRemaining}
			</div>
			<Tooltip>
				<span slot="tooltip-content"> Add funds </span>
				<a href="#add-funds" aria-label="Add funds" title="Add funds">
					<IconPlus size={20} />
				</a>
			</Tooltip>
		</div>
	</div>

	{#if tokensUsed >= tokensTotal}
		<InfoBox type="danger">
			<span slot="title"> You have exceeded your allowed Hydrollar usage. </span>

			Please <a href="#add-funds">add more Hydrollars</a> to continue using Habile Chat.
		</InfoBox>
	{/if}

	<div class="stats">
		<Card>
			<div slot="card-content">
				<h3>
					<img src="/assets/hydrollar.webp" alt="Hydrollar" height={32} width={32} />
					{tokensRemaining}
				</h3>
				<span> Hydrollars left </span>
			</div>
		</Card>
		<Card>
			<div slot="card-content">
				<h3>
					<img src="/assets/hydrollar.webp" alt="Hydrollar" height={32} width={32} />
					{tokensUsed}
				</h3>
				<span> Hydrollars spent </span>
			</div>
		</Card>
		<Card>
			<div slot="card-content">
				<h3>
					<IconMessageCircle size={32} />
					{habileChatData.messagesSent}
				</h3>
				<span> messages sent </span>
			</div>
		</Card>
	</div>

	<details open>
		<summary>
			<span class="chevron">
				<IconChevronRight />
			</span>

			View usage breakdown
		</summary>
		<div class="content">
			<progress
				value={(tokensUsed - 80) / tokensTotal}
				style:--color-progress={tokensUsed - 80 >= tokensTotal
					? 'var(--color-error)'
					: 'var(--color-on-background)'}
			/>
			<p class="details">
				<img src="/assets/hydrollar.webp" alt="Hydrollar" height={20} width={20} />
				{tokensUsed - 80} / {tokensTotal - 80} paid Hydrollar credit used
			</p>

			<progress
				value={tokensUsed / 0.8}
				style:--color-progress={tokensUsed >= 80
					? 'var(--color-error)'
					: 'var(--color-on-background)'}
			/>
			<p class="details">
				<img src="/assets/hydrollar.webp" alt="Hydrollar" height={20} width={20} />
				{habileChatData.tokens >= 0.8 ? 80 : tokensUsed} / {80} free Hydrollar credit used
			</p>

			<progress
				value={data.globalData?.used / data.globalData?.tokens}
				style:--color-progress={data.globalData?.used >= data.globalData?.tokens
					? 'var(--color-error)'
					: 'var(--color-on-background)'}
			/>
			<p class="details">
				<img src="/assets/hydrollar.webp" alt="Hydrollar" height={20} width={20} />
				{Math.ceil(data.globalData?.used * 100)} / {data.globalData?.tokens * 100} global Hydrollar credit
				used by all users
			</p>
		</div>
	</details>
</main>

<style lang="scss">
	#usage {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 1.5rem;

		.title {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			justify-content: space-between;

			.split-remaining {
				display: flex;
				align-items: center;
				border-radius: 0.5rem;
				border: 1px solid var(--color-outline);

				.remaining {
					display: flex;
					align-items: center;
					color: var(--color-background);
					background: var(--color-on-background);
					padding: 0.25rem 0.75rem;
					gap: 0.5rem;
					font-weight: 500;
					border-radius: 0.5rem 0 0 0.5rem;
				}

				a {
					display: grid;
					place-items: center;
					padding: 0.25rem 0.415rem;
				}
			}
		}

		progress {
			width: 100%;
			height: 1.5rem;
			border-radius: 99rem;
			margin: 0;
			appearance: none;
			border: 1px solid var(--color-outline);
			background: var(--color-background);
			overflow: hidden;
			accent-color: var(--color-on-background);

			&::-moz-progress-bar {
				background: var(--color-progress);
				border-radius: 99rem;
				outline: 1px solid var(--color-outline);
			}

			&::-webkit-progress-bar {
				background: var(--color-progress);
				border-radius: 99rem;
				outline: 1px solid var(--color-outline);
			}

			&::-webkit-progress-value {
				background: var(--color-progress);
				border-radius: 99rem;
				outline: 1px solid var(--color-outline);
			}
		}

		.details {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.9rem;
			color: var(--color-on-surface);
		}

		details {
			border: 1px solid var(--color-outline);
			border-radius: 1rem;
			overflow: hidden;

			summary {
				width: 100%;
				cursor: pointer;
				padding: 0.75rem;
				border-radius: 1rem;
				user-select: none;
				display: flex;
				align-items: center;
				gap: 0.5rem;

				::webkit-details-marker {
					display: none;
				}

				.chevron {
					display: grid;
					place-items: center;
					transition: transform 250ms cubic-bezier(0.5, 0, 0.25, 1.75);
				}

				&:hover {
					background-color: var(--color-surface);
				}
			}

			.content {
				display: flex;
				flex-direction: column;
				padding: 0.75rem;
				gap: 0.5rem;
				max-height: 0px;
				overflow: hidden;
				transition: max-height 400ms cubic-bezier(0, 1, 0, 1);
			}

			&[open] {
				summary {
					border-bottom: 1px solid var(--color-outline);
					background-color: var(--color-surface);
					border-radius: 1rem 1rem 0 0;

					.chevron {
						transform: rotate(90deg);
					}
				}

				.content {
					max-height: 800px;
				}
			}
		}

		.stats {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 0.5rem;

			h3 {
				display: flex;
				align-items: center;
				gap: 0.25rem;

				img,
				:global(svg) {
					margin-right: 0.5rem;
				}
			}
		}
	}
</style>
