<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	const dispatch = createEventDispatcher();

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => {
		dispatch('close');
		showModal = false;
	}}
	on:click|self={() => dialog.close()}
>
	<slot name="title">
		<h1>Modal Title</h1>
	</slot>
	<slot />
</dialog>

<style lang="scss">
	dialog {
		appearance: none;
		border: 1px solid var(--color-on-background);
		background-color: white;
		border-radius: 1rem;
		max-width: 100%;
		width: 600px;
		padding: 0;
		transition: scale 200ms ease-out, opacity 200ms ease-out;
		padding: 1rem;

		:global(h1) {
			margin-top: 0.25rem;
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
