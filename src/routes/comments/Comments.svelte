<script lang="ts">
	import type { Comment as CommentType, User } from '$lib/db/types';
	import { rankComments } from '$lib/helpers/rankComments';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
	import HabileScared from '$lib/svg/HabileScared.svelte';
	import CommentForm from './CommentForm/CommentForm.svelte';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import CommentList from './Comment/CommentList.svelte';
	import { showLoginDialog, showRestrictedAccountDialog } from '$lib/stores/modals';

	export let userData: User | null | undefined;
	export let parentComment: CommentType | null | undefined = null;
	export let projectId: string | null = null;
	export let comments: CommentType[];
	export let hideCreateForm = false;

	export let showReplyModal = false;

	let selectedSortingMode: 'interactions' | 'recent' = 'recent';
	let selectedParentComment = parentComment;

	$: sortedAndFiltered = rankComments(comments, userData, selectedSortingMode);
</script>

<div class="comments-page" id="comments">
	{#if $showRestrictedAccountDialog}
		<RestrictedFunctionalityModal />
	{/if}

	{#if $showLoginDialog}
		<LoginModal />
	{/if}

	<header>
		<div class="title">
			{#if projectId}
				<h3>Comments</h3>
			{:else if parentComment}
				<h3>Replies</h3>
			{:else}
				<h1>Comments</h1>
			{/if}
			<div class="title-text">
				<span class="subtext">
					{sortedAndFiltered.length}
					{sortedAndFiltered.length === 1 ? 'comment' : 'comments'}
				</span>
			</div>
		</div>
		{#if !hideCreateForm}
			<CommentForm
				{projectId}
				parentComment={selectedParentComment}
				bind:showModal={showReplyModal}
			/>
		{/if}
	</header>

	{#if comments.length}
		{#if sortedAndFiltered.length}
			<CommentList comments={sortedAndFiltered} />
			<li class="no-comments">
				<HabileHappy />
				You've reached the end of the comments!
			</li>
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
	.comments-page {
		margin: 1rem;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 1rem;

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
</style>
