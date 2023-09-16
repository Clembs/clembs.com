<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { draggable, type DragEventData } from '@neodrag/svelte';

	export let showSheet: boolean;

	let dialog: HTMLDialogElement;

	const dispatch = createEventDispatcher();

	$: if (dialog && showSheet) dialog.showModal();

	let position = { x: 0, y: 0 };

	function handleDragStop(event: CustomEvent<DragEventData>) {
		event.preventDefault();
		position.y = 0;
		if (event.detail.offsetY >= 200) {
			showSheet = false;
			dialog.close();
		}
	}
</script>

<!-- on:neodrag={handleDragDismiss} -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	use:draggable={{
		onDrag({ offsetY }) {
			position.y = offsetY;
		},
		position,
		axis: 'y',
		handle: '.handle-wrapper',
		bounds: { top: 38, bottom: -Infinity },
	}}
	on:neodrag:end={handleDragStop}
	on:close={() => {
		dispatch('close');
		showSheet = false;
	}}
	on:click|self={() => dialog.close()}
>
	<div class="contents" on:click|stopPropagation>
		<div class="handle-wrapper">
			<span class="handle" />
		</div>
		<slot />
	</div>
	{#if $$slots.buttons}
		<div on:click|stopPropagation class="buttons">
			<slot name="buttons" />
		</div>
	{/if}
</dialog>

<style lang="scss">
	dialog {
		appearance: none;
		position: fixed;
		border: 1px solid var(--color-outline);
		border-bottom: none;
		background-color: var(--color-background);
		border-radius: 1.5rem 1.5rem 0 0;
		width: clamp(600px, 40vw, 100%);
		transition: transform 200ms ease-out;
		padding: 0;
		overflow: visible;
		height: 100vh;
		margin: auto;
		z-index: 10;
		margin-block-end: 0;
		max-inline-size: 100%;

		.handle-wrapper {
			width: 100%;
			padding: 0.75rem;
			display: flex;
			justify-content: center;

			.handle {
				display: block;
				height: 3px;
				width: 5rem;
				border-radius: 9rem;
				background-color: var(--color-on-surface);
			}
		}

		.contents {
			height: 100%;
		}

		:global(h1) {
			margin-bottom: 1.5rem;
			line-height: 1.2;
		}

		&[open] {
			animation: zoom 300ms ease;
		}

		@keyframes zoom {
			from {
				transform: translateY(100%);
			}
			to {
				transform: translateY(0);
			}
		}

		&::backdrop {
			background-color: rgb(0 0 0 / 0.5);
		}
	}
</style>
