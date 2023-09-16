<script>
	import AccountSettings from './account/AccountSettings.svelte';
</script>

<AccountSettings />

<!-- <script lang="ts">
	import Switch from '$lib/components/Switch.svelte';
	import { settingsStore } from './settings';
	import IconVolume from '@tabler/icons-svelte/dist/svelte/icons/IconVolume.svelte';

	let soundEnabled = $settingsStore?.soundEnabled || true;
</script> -->

<!-- {#if $settingsStore}
	<Switch bind:checked={$settingsStore.soundEnabled}>
		<span class="switch-label">
			<IconVolume />
			Enable sound effects
		</span>
	</Switch>
{:else}
	<Switch bind:checked={soundEnabled}>
		<span class="switch-label">
			<IconVolume />
			Enable sound effects
		</span>
	</Switch>
{/if}

<style lang="scss">
	.switch-label {
		display: flex;
		font-size: 1.1rem;
		gap: 0.5rem;
		align-items: center;
	}
</style> -->
