<script lang="ts">
	import Comment from './Comment/Comment.svelte';
	import type { Comment as CommentType, User } from '$lib/db/types';
	import { rankComments } from '$lib/helpers/rankComments';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
	import HabileScared from '$lib/svg/HabileScared.svelte';
	import CommentForm from './CommentForm/CommentForm.svelte';
	import Button from '$lib/components/Button.svelte';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';

	export let userData: User | null | undefined;
	export let parentComment: CommentType | null | undefined = null;
	export let projectId: string | null = null;
	export let comments: CommentType[];
	export let hideCreateForm = false;

	export let showLoginModal = false;
	export let showReplyModal = false;
	export let showRestrictedFunctionalityModal = false;

	let selectedSortingMode: 'interactions' | 'recent' = 'recent';
	let selectedParentComment = parentComment;

	$: sortedAndFiltered = rankComments(comments, userData, selectedSortingMode);
</script>

<div class="comments-page" id="comments">
	<RestrictedFunctionalityModal bind:showModal={showRestrictedFunctionalityModal} />

	<header>
		<div class="title">
			<div class="title-text">
				<h3>
					{#if projectId}
						Comments
					{:else if parentComment}
						Replies
					{:else}
						Main feed
					{/if}
				</h3>
				<span class="subtext">
					{sortedAndFiltered.length}
					{sortedAndFiltered.length === 1 ? 'comment' : 'comments'}
				</span>
			</div>
			<div class="title-account"></div>
			{#if userData}
				<Button style="outlined" href="/account">Settings</Button>
			{/if}
		</div>
		{#if !hideCreateForm}
			<CommentForm
				{projectId}
				parentComment={selectedParentComment}
				bind:showModal={showReplyModal}
				bind:showLoginModal
				bind:showRestrictedFunctionalityModal
			/>
		{/if}
	</header>

	{#if comments.length}
		{#if sortedAndFiltered.length}
			<div class="comments" use:autoAnimate>
				{#each sortedAndFiltered as comment (comment.id)}
					<Comment {comment} bind:showLoginModal bind:showRestrictedFunctionalityModal />
				{/each}

				<div class="no-comments">
					<HabileHappy />
					You've reached the end of the comments!
				</div>
			</div>
		{:else}
			<div class="no-comments">
				<HabileScared />
				You've filtered too much...
			</div>
		{/if}
	{:else}
		<div class="no-comments">
			<HabileNeutral />
			{#if hideCreateForm}
				No comments yet...
			{:else}
				No comments, but you could be the first!
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem;
		margin-top: 2rem;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.25rem;

			h3 {
				font-size: 1.5rem;
			}
		}
	}

	.no-comments {
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0.5;
		gap: 0.5rem;
		color: var(--color-on-surface);
		font-size: 1.1rem;
		width: 100%;
		text-align: center;
		padding: 2rem;
		user-select: none;

		:global(svg) {
			width: 64px;
			height: 64px;
		}
	}

	.comments {
		list-style: none;
		padding: 0;
		margin: 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
