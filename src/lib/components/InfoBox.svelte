<script lang="ts">
	import IconInfoCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconInfoCircleFilled.svelte';
	import IconCircleCheckFilled from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheckFilled.svelte';
	import IconAlertTriangleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertTriangleFilled.svelte';
	import IconAlertCircleFilled from '@tabler/icons-svelte/dist/svelte/icons/IconAlertCircleFilled.svelte';

	export let type: 'note' | 'info' | 'caution' | 'danger' | 'success';

	const icons: Record<typeof type, any> = {
		danger: IconAlertCircleFilled,
		caution: IconAlertTriangleFilled,
		info: IconInfoCircleFilled,
		note: IconInfoCircleFilled,
		success: IconCircleCheckFilled,
	};
</script>

<div class="info-box {type}">
	<div class="icon">
		<svelte:component this={icons[type]} />
	</div>
	<div class="right">
		<div class="text">
			<div class="title">
				<slot name="title" />
			</div>
			<span class="description">
				<slot />
			</span>
		</div>
		{#if $$slots.actions}
			<div class="actions">
				<slot name="actions" />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.info-box {
		display: flex;
		gap: 1rem;
		align-items: center;
		border: 1px solid var(--color-outline);
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		text-align: left;
		margin-bottom: 0.5rem;
		background-color: var(--color-surface);
		color: var(--color-on-background);
		width: 100%;

		.icon {
			height: 24px;
			width: 24px;
		}

		.right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 0.5rem;
			flex: 1;

			.title {
				font-size: 1.1rem;
				font-weight: 500;
			}

			.description {
				font-size: 0.9rem;
				opacity: 0.9;
			}
		}

		&.danger {
			background-color: var(--color-error);
			color: var(--color-on-error);
		}
		&.success {
			background-color: var(--color-success);
			color: var(--color-on-success);
		}
	}
</style>
