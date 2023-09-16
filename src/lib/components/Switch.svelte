<script lang="ts">
	export let indeterminate = false;
	export let required = true;
	export let disabled = false;
	export let readonly = false;
	export let name = '';
	export let checked: undefined | boolean = false;

	let id = Math.round(Math.random() * 100);
</script>

<label for={id.toString()}>
	<slot />
	<input
		bind:checked
		on:change
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
		--track-size: calc(var(--thumb-size) * 2);
		--track-padding: 2px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 0.25rem;

		cursor: pointer;
		user-select: none;

		font-size: 1.1rem;

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
				scale: 0.75;
				background-color: var(--color-background);
				outline: 1px solid var(--color-outline);

				transition: transform 200ms ease, scale 150ms ease;
			}

			&:disabled {
				opacity: 0.315;
				cursor: not-allowed;
			}

			&:not(:disabled):hover::before {
				scale: 1.1;
			}

			&:not(:disabled):active::before {
				scale: 0.9;
			}

			&:checked {
				background: var(--color-outline);
				--thumb-position: calc(var(--track-size) - 100%);

				&::before {
					scale: 1;
				}

				&:not(:disabled):hover::before {
					scale: 1.1;
				}

				&:not(:disabled):active::before {
					scale: 0.9;
				}
			}
		}
	}
</style>
