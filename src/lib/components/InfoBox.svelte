<script lang="ts">
	import {
		IconInfoCircleFilled,
		IconCircleCheckFilled,
		IconAlertTriangleFilled,
		IconAlertCircleFilled,
	} from '@tabler/icons-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		type: 'note' | 'info' | 'caution' | 'danger' | 'success';
		title?: Snippet;
		children?: Snippet;
		actions?: Snippet;
	}

	let { type, title, children, actions }: Props = $props();

	const icons: Record<typeof type, any> = {
		danger: IconAlertCircleFilled,
		caution: IconAlertTriangleFilled,
		info: IconInfoCircleFilled,
		note: IconInfoCircleFilled,
		success: IconCircleCheckFilled,
	};

	const Icon = $derived(icons[type]);
</script>

<div class="info-box {type}">
	<div class="icon">
		<Icon />
	</div>
	<div class="right">
		<div class="text">
			<div class="title">
				{@render title?.()}
			</div>
			<span class="description">
				{@render children?.()}
			</span>
		</div>
		{#if actions}
			<div class="actions">
				{@render actions?.()}
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
