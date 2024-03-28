<script lang="ts">
	import CommentComponent from './Comment.svelte';
	import type { Comment } from '$lib/db/types';

	export let comments: Comment[];
</script>

<ul>
	{#each comments as comment, i (comment.id)}
		<CommentComponent {comment} />
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
</style>
