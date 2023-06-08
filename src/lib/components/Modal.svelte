<script lang="ts">
	let dialog: HTMLDialogElement;

	export function showModal() {
		dialog.showModal();
	}

	export function close() {
		dialog.close();
	}
</script>

<dialog class="modal" bind:this={dialog}>
	<slot />
</dialog>

<style lang="scss">
	.modal {
		opacity: 0;
		scale: 0.8;

		appearance: none;
		border: 1px solid black;
		background-color: white;
		border-radius: 1rem;
		max-width: 100%;
		width: 500px;
		padding: 0;
		transition: scale 200ms ease-out, opacity 200ms ease-out;

		&[open] {
			scale: 1;
			opacity: 1;
			pointer-events: inherit;
		}

		&::backdrop {
			background-color: rgb(0 0 0 / 0.6);
		}
	}
</style>
