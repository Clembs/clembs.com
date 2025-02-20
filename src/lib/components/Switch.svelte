<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		indeterminate?: boolean;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		name?: string;
		checked?: undefined | boolean;
		onchange?: (event: Event) => void;
		children?: Snippet;
	}

	let {
		indeterminate = false,
		required = true,
		disabled = false,
		readonly = false,
		name = '',
		checked = $bindable(false),
		onchange,
		children,
	}: Props = $props();

	let id = Math.round(Math.random() * 100);
</script>

<label for={id.toString()}>
	<div class="label">
		{@render children?.()}
	</div>
	<input
		bind:checked
		{onchange}
		{name}
		{indeterminate}
		type="checkbox"
		role="switch"
		id={id.toString()}
		{disabled}
		{readonly}
		{required}
	/>
</label>

<style lang="scss">
	label {
		--thumb-size: 1.5rem;
		--thumb-color: var(--color-on-surface);
		--track-size: calc(var(--thumb-size) * 2);
		--track-padding: 2px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 0.25rem;

		cursor: pointer;
		user-select: none;

		font-size: 1.1rem;

		.label {
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		input {
			--thumb-position: 0%;
			cursor: pointer;

			appearance: none;
			touch-action: pan-y;
			box-sizing: content-box;

			inline-size: var(--track-size);
			block-size: var(--thumb-size);
			border-radius: var(--track-size);

			background: var(--color-surface);
			border: 1px solid var(--color-outline);
			border-radius: 99rem;
			padding: 2px;

			flex-shrink: 0;
			display: grid;
			align-items: center;
			grid: [track] 1fr / [track] 1fr;

			&::before {
				content: '';
				cursor: inherit;
				pointer-events: auto;
				grid-area: track;
				inline-size: var(--thumb-size);
				block-size: var(--thumb-size);
				border-radius: 99rem;
				transform: translateX(var(--thumb-position));
				scale: 0.625;
				background-color: var(--thumb-color);
				outline: 1px solid var(--color-outline);

				transition:
					transform 200ms ease,
					scale 150ms ease;
			}

			&:disabled {
				opacity: 0.315;
				cursor: not-allowed;
			}

			&:not(:disabled):hover::before {
				scale: 0.875;
			}

			&:not(:disabled):active::before {
				scale: 0.5;
			}

			&:checked {
				background: var(--color-outline);
				--thumb-position: calc(var(--track-size) - 100%);
				--thumb-color: var(--color-background);

				&::before {
					scale: 1;
				}

				&:not(:disabled):hover::before {
					scale: 1.125;
					--thumb-position: calc(var(--track-size) - 110%);
				}

				&:not(:disabled):active::before {
					scale: 0.75;
					--thumb-position: calc(var(--track-size) - 65%);
				}
			}
		}
	}
</style>
