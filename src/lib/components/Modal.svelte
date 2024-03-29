<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import { createEventDispatcher } from 'svelte';

	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	const dispatch = createEventDispatcher();

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => {
		dispatch('close');
		showModal = false;
	}}
>
	<form class="close-button" method="dialog">
		<button>
			<IconX />
		</button>
	</form>
	<div>
		{#if $$slots.title}
			<slot name="title">
				<h1>Modal Title</h1>
			</slot>
		{/if}
		<slot />
	</div>
	{#if $$slots.buttons}
		<div class="buttons">
			<slot name="buttons" />
		</div>
	{/if}
</dialog>

<style lang="scss">
	dialog {
		appearance: none;
		border: 1px solid var(--color-outline);
		background-color: var(--color-background);
		box-shadow: 0 2px 0 0 var(--color-outline);
		border-radius: 1.5rem;
		max-width: 600px;
		transition:
			scale 200ms ease-out,
			opacity 200ms ease-out;
		padding: 0;
		position: relative;
		overflow: visible;

		.close-button {
			position: absolute;
			right: -1.25rem;
			top: -1.25rem;
			width: min-content;

			button {
				display: grid;
				place-items: center;
				padding: 0.5rem;
				border: 1px solid var(--color-outline);
				background-color: var(--color-background);
				border-radius: 99rem;

				&:hover {
					background-color: var(--color-surface);
				}
			}
		}

		div {
			padding: 1rem;
		}

		.buttons {
			display: flex;
			gap: 0.75rem;
			padding: 1rem 1.5rem;
			border-top: 1px solid var(--color-outline);
			justify-content: flex-end;
		}
		:global(h1) {
			margin-bottom: 1.5rem;
			line-height: 1.2;
		}

		&[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}

		@keyframes zoom {
			from {
				transform: scale(0.95);
			}
			to {
				transform: scale(1);
			}
		}

		&::backdrop {
			background-color: rgb(0 0 0 / 0.5);
		}
	}
</style>
