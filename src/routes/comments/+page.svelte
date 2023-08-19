<script lang="ts">
	import type { PageServerData } from './$types';
	import Comment from './Comment.svelte';
	import type { Comment as CommentType } from './+page.server';
	import CommentFormModal from './CommentFormModal.svelte';

	export let data: PageServerData;
	let showModal = false;

	let selectedParentComment: CommentType | null = null;
</script>

<main>
	<h1>Comment Section</h1>

	<CommentFormModal
		on:close={() => {
			console.log('hi');
			selectedParentComment = null;
		}}
		bind:showModal
		parentComment={selectedParentComment}
	/>

	{#each data.comments as comment}
		<Comment
			{comment}
			on:reply={(comment) => {
				showModal = true;
				//@ts-ignore
				selectedParentComment = comment;
			}}
		/>
	{/each}
</main>

<style lang="scss">
	main {
		padding: 1rem;
	}
</style>
