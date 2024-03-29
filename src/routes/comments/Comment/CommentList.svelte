<script lang="ts">
	import CommentComponent from './Comment.svelte';
	import type { Comment } from '$lib/db/types';
	import autoAnimate from '@formkit/auto-animate';

	export let comments: Comment[];
</script>

<ul use:autoAnimate>
	{#each comments as comment (comment.id)}
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
