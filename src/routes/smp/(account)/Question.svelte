<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { ComponentType } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;
	export let description: string = '';
	export let choices: {
		label: string;
		description: string;
		icon?: ComponentType;
		value?: string;
		href?: string;
	}[];

	const dispatch = createEventDispatcher();
</script>

<div class="question">
	<header>
		<h2>{title}</h2>
		<p class="subtext">{description}</p>
	</header>

	<div class="choices">
		{#each choices as choice}
			<Card href={choice.href} on:click={() => choice.value && dispatch('change', choice.value)}>
				<div class="card-content" slot="card-content">
					{#if choice.icon}
						<div class="icon">
							<svelte:component this={choice.icon} size={48} stroke={1.5} />
						</div>
					{/if}

					<h3>
						{choice.label}
					</h3>

					<p class="subtext">
						{choice.description}
					</p>
				</div>
			</Card>
		{/each}
	</div>
</div>

<style lang="scss">
	.question {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		h2 {
			font-size: 2rem;
		}

		.choices {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: 1rem;
		}

		.card-content {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon {
				background-color: var(--color-surface);
				border-radius: 50%;
				padding: 0.5rem;
				border: 1px solid var(--color-outline);
				display: grid;
				margin-bottom: 1rem;
			}

			h3 {
				font-size: 1.5rem;
				font-weight: 500;
				margin-bottom: 0.5rem;
			}

			p {
				font-size: 1rem;
				text-align: center;
			}
		}
	}
</style>
