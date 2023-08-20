<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import type { Comment as CommentType } from './+page.server';
	import Comment from './Comment.svelte';
	import Curve from '$lib/components/Curve.svelte';
	import CommentForm from './CommentForm.svelte';
	import { onMount } from 'svelte';

	export let showModal = false;

	export let parentComment: CommentType | null = null;
	let formComponent: HTMLFormElement;

	onMount(() => formComponent.focus());
</script>

<Modal on:close bind:showModal>
	<h1 slot="title">
		{parentComment ? `Reply to ${parentComment.author?.username ?? 'comment'}` : 'Write a comment'}
	</h1>
	{#if parentComment}
		<div class="parent-comment">
			<div aria-hidden="false" class="branch">
				<Curve />
				<div class="line" />
			</div>
			<Comment showActions={false} comment={parentComment} />
		</div>
	{/if}

	<CommentForm bind:formComponent {parentComment} bind:showModal />
</Modal>

<style lang="scss">
	.parent-comment {
		display: flex;
		// gap: 0.5rem;
		margin-bottom: 1rem;

		.branch {
			position: relative;
			color: var(--color-on-surface);
			top: 1.5rem;
			margin-left: 17.5px;

			:global(svg) {
				height: 24px;
				width: 24px;
			}

			.line {
				position: relative;
				top: -0.5rem;
				height: calc(100% - 2.25rem);
				width: 2px;
				margin: 0;
				background-color: var(--color-on-surface);
			}
		}
	}
</style>
