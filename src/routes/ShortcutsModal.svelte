<script lang="ts">
	import Key from '$lib/components/Key.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { onMount } from 'svelte';
	import IconKeyboard from '@tabler/icons-svelte/dist/svelte/icons/IconKeyboard.svelte';
	import IconLayoutBottombar from '@tabler/icons-svelte/dist/svelte/icons/IconLayoutBottombar.svelte';
	import Icon123 from '@tabler/icons-svelte/dist/svelte/icons/Icon123.svelte';
	import { page } from '$app/stores';

	let showModal = false;

	interface KbdShortcut {
		keys: string[];
		label: string;
		icon: any;
	}

	const ctrl = 'Ctrl',
		alt = 'Alt',
		shift = 'Shift',
		option = '⌘';
	let modifierKey = ctrl;
	const modifierKeys = [ctrl, alt, shift, option];

	const shortcuts: KbdShortcut[] = [
		{
			keys: [ctrl, '/'],
			label: 'Show keyboard shortcuts',
			icon: IconKeyboard,
		},
		{
			keys: [alt, 'N'],
			label: 'Focus navigation',
			icon: IconLayoutBottombar,
		},
		{
			keys: ['F3'],
			label: 'Debug menu',
			icon: Icon123,
		},
		...($page.status === 404
			? [
					{
						keys: ['Space'],
						label: 'Jump',
						icon: '',
					},
			  ]
			: []),
	];

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
			console.log('hi');
			showModal = true;
		}
		if (e.key === 'Escape') showModal = false;
	}}
/>

<Modal bind:showModal>
	<div class="shortcut-modal">
		<header>
			<h1>Keyboard combos</h1>

			<!-- <Button on:click={() => dialog.close()} style="text">
				<IconX />
			</Button> -->
		</header>

		<div class="shortcut-list">
			{#each shortcuts as shortcut}
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
		</div>
	</div>
</Modal>

<style lang="scss">
	header {
		padding: 0 1rem;
		border-bottom: 1px solid var(--color-on-background);
	}

	.shortcut-list {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.5rem;

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
