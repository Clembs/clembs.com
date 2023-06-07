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
		display: block;
		pointer-events: none;
		opacity: 0;
		scale: 0.8;
		transition: opacity 0.5s;

		appearance: none;
		border: 1px solid black;
		background-color: white;
		border-radius: 1rem;
		min-width: 500px;
		padding: 0;
		transition: scale 200ms ease-out, opacity 200ms ease-out;

		&[open] {
			scale: 1;
			opacity: 1;
			transition: scale 200ms ease-out, opacity 200ms ease-out;
			pointer-events: inherit;
		}

		&::backdrop {
			background-color: rgb(0 0 0 / 0.6);
		}
	}
</style>
