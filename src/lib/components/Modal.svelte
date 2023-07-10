<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<slot />
</dialog>

<style lang="scss">
	dialog {
		appearance: none;
		border: 1px solid var(--color-on-background);
		background-color: white;
		border-radius: 1rem;
		max-width: 100%;
		width: 500px;
		padding: 0;
		transition: scale 200ms ease-out, opacity 200ms ease-out;

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
