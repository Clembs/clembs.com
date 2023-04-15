<script lang="ts">
	import Tag from './Tag.svelte';

	export let tags: string[];
</script>

<div class="tags">
	{#each tags as tag}
		<Tag label={tag} />
	{/each}
</div>

<style lang="scss">
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
