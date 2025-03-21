<script lang="ts">
	import { IconX } from '@tabler/icons-svelte';
	import { type Snippet } from 'svelte';

	interface Props {
		showModal: boolean;
		title?: Snippet;
		children?: Snippet;
		buttons?: Snippet;
		onclose?: () => void;
	}

	let { showModal = $bindable(), title, children, buttons, onclose }: Props = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (dialog && showModal) {
			dialog.showModal();
		}
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		onclose?.();
		showModal = false;
	}}
>
	<form class="close-button" method="dialog">
		<button>
			<IconX />
		</button>
	</form>
	<div>
		{#if title}
			{#if title}{@render title()}{:else}
				<h1>Modal Title</h1>
			{/if}
		{/if}
		{@render children?.()}
	</div>
	{#if buttons}
		<div class="buttons">
			{@render buttons?.()}
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
		min-width: 400px;
		transition:
			scale 200ms ease-out,
			opacity 200ms ease-out;
		padding: 0;
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
				color: var(--color-on-background);
				border-radius: 99rem;

				&:hover {
					background-color: var(--color-surface);
				}
			}
		}

		div {
			padding: 1rem;
			overflow: auto;
			color: var(--color-on-background);
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
