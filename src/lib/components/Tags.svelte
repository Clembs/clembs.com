<script lang="ts">
	import Tag from './Tag.svelte';

	export let tags: string[];
</script>

<div class="tags">
	{#each tags as tag}
		<Tag label={tag} background="white" color="black" />
	{/each}
</div>

<style lang="scss">
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
</style>
