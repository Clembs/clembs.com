<script lang="ts">
	import Chip from './Chip.svelte';
	import { createEventDispatcher } from 'svelte';

	export let entries: { label: string; href?: string; id: string }[];
	export let vertical = false;

	export let activeTab: (typeof entries)[number]['id'] = entries[0].id;

	const dispatch = createEventDispatcher();

	function changeTab(newEntryId: string) {
		dispatch('change', newEntryId);
		activeTab = newEntryId;
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
		margin: 0;
		padding: 0;
		scrollbar-width: none;
		overflow-x: hidden;
		overflow-y: scroll;
		gap: 0.25rem;
		width: 100%;

		&::-webkit-scrollbar {
			display: none;
		}

		:global(.chip) {
			width: 100%;
		}

		&.vertical {
			flex-direction: column;
			overflow-x: scroll;
			overflow-y: hidden;
		}
	}
</style>
