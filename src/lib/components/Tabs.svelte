<script lang="ts">
	import Chip from './Chip.svelte';
	import { createEventDispatcher } from 'svelte';

	export let entries: { label: string; href?: string; id: string }[];
	export let vertical = false;

	export let activeTab = entries[0].id;

	const dispatch = createEventDispatcher();

	function changeTab(newEntryId: string) {
		activeTab = newEntryId;
		dispatch('change', newEntryId);
	}
</script>

<ul role="tablist" class:vertical>
	{#each entries as entry}
		<Chip href={entry.href} checked={activeTab === entry.id} on:click={() => changeTab(entry.id)}>
			{entry.label}
		</Chip>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		border-radius: 1.25rem;
		border: 1px solid var(--color-on-background);
		margin: 1rem 0;
		padding: 0;

		:global(.chip) {
			width: 100%;
		}

		&.vertical {
			flex-direction: column;
		}
	}

	@media (max-width: 768px) {
		ul {
			flex-direction: column;
		}
	}
</style>
