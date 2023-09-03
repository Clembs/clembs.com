<script lang="ts">
	import Key from '$lib/components/Key.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';
	import { ctrl, modifierKeys, option, shortcutGroups } from './shortcuts';

	let showModal = false;
	let modifierKey = ctrl;

	onMount(() => {
		if (window.navigator.userAgent.toLowerCase().includes('mac')) {
			modifierKey = option;
		}
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if ((e.metaKey || e.ctrlKey) && e.keyCode === 58) {
			if (showModal) return;
			showModal = true;
		}
	}}
/>

<Modal bind:showModal>
	<h1 slot="title">Keyboard shortcuts</h1>

	<div class="shortcut-list">
		{#each shortcutGroups as shortcutGroup, i}
			<section class="shortcut-group">
				<h3>{shortcutGroup.label}</h3>

				{#each shortcutGroup.shortcuts as shortcut}
					<div class="shortcut">
						<span class="shortcut-label">
							<svelte:component this={shortcut.icon} />
							{shortcut.label}
						</span>
						<span class="keys">
							{#each shortcut.keys as key}
								<Key modifier={modifierKeys.includes(key)}>{key.replace(ctrl, modifierKey)}</Key>
							{/each}
						</span>
					</div>
				{/each}
				{#if i + 1 !== shortcutGroups.length}
					<hr />
				{/if}
			</section>
		{/each}
	</div>
</Modal>

<style lang="scss">
	.shortcut-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.shortcut-group {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			hr {
				width: 100%;
				height: 1px;
				color: var(--color-surface);
			}
		}
		.shortcut {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 2rem;

			.shortcut-label {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}

			:global(.keys > *) {
				margin-right: 3px;
			}
		}
	}
</style>
