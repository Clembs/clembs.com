<script lang="ts">
	import Comment from './Comment/Comment.svelte';
	import type { Comment as CommentType, User } from '$lib/db/types';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import CommentFormModal from './CommentFormModal.svelte';
	import { rankComments } from '$lib/helpers/rankComments';
	import Chip from '$lib/components/Chip.svelte';
	import CreateCommentButton from './CreateCommentButton.svelte';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import UserInfoModal from '$lib/components/UserInfoModal.svelte';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';

	export let userData: User | null | undefined;
	export let parentComment: CommentType | null | undefined = null;
	export let projectId: string | null = null;
	export let comments: CommentType[];
	export let showModal = false;

	let filters = {
		anonymous: true,
		blocked: false,
	};

	let selectedSortingMode: 'interactions' | 'recent' = 'recent';
	let selectedParentComment = parentComment;
	let skipToComment = true;
	let showRestrictedFunctionalityModal = false;
	let showUserInfoModal = false;
	let selectedUser: User;

	$: sortedAndFiltered = rankComments(comments, userData, selectedSortingMode, filters);

	function handleReplyButton(event: { detail: CommentType | null | undefined } | undefined) {
		if (event) {
			selectedParentComment = event.detail;
		}
		skipToComment = true;
		showModal = true;
	}

	function handleLoginRequiredButton() {
		skipToComment = false;
		showModal = true;
	}

	function handleRestrictedFunctionality() {
		showRestrictedFunctionalityModal = true;
	}

	function handleUserInfoButton(event: { detail: User }) {
		showUserInfoModal = true;
		selectedUser = event.detail;
	}
</script>

<div class="comments-page" id="comments">
	<UserInfoModal userData={selectedUser} bind:showModal={showUserInfoModal} />

	{#if !userData}
		<LoginModal
			bind:showModal
			parentComment={selectedParentComment}
			{skipToComment}
			on:close={() => {
				if (!parentComment) {
					selectedParentComment = null;
				}
			}}
		/>
	{:else}
		<CommentFormModal
			bind:showModal
			{projectId}
			parentComment={selectedParentComment}
			on:close={() => {
				if (!parentComment) {
					selectedParentComment = null;
				}
			}}
		/>
	{/if}

	<RestrictedFunctionalityModal bind:showModal={showRestrictedFunctionalityModal} />

	<header>
		<div class="title">
			<h3>{projectId ? `Comments` : 'Main feed'}</h3>
			<span class="count">
				{sortedAndFiltered?.length || 0}
				{sortedAndFiltered?.length === 1 ? 'comment' : 'comments'}
			</span>
		</div>

		<CreateCommentButton
			{userData}
			on:blocked={handleRestrictedFunctionality}
			on:click={() => {
				if (userData?.badges?.includes('BLOCKED')) {
					return handleRestrictedFunctionality();
				}
				handleReplyButton({
					detail: parentComment,
				});
			}}
		/>
	</header>

	{#if comments.length}
		<div class="sort-and-filter">
			<div class="chips">
				<Chip
					checked={selectedSortingMode === 'interactions'}
					on:click={() =>
						(selectedSortingMode = selectedSortingMode === 'recent' ? 'interactions' : 'recent')}
				>
					Most replied to
				</Chip>
				<Chip
					checked={!filters.anonymous}
					on:click={() => (filters.anonymous = !filters.anonymous)}
				>
					Hide anonymous users
				</Chip>
				<Chip checked={filters.blocked} on:click={() => (filters.blocked = !filters.blocked)}>
					Show blocked users
				</Chip>
			</div>
		</div>

		<div class="comments" use:autoAnimate>
			{#each sortedAndFiltered.filter((c) => c.isPinned) as comment (comment.id)}
				<Comment
					{comment}
					on:reply={handleReplyButton}
					on:login={handleLoginRequiredButton}
					on:blocked={handleRestrictedFunctionality}
					on:userinfo={handleUserInfoButton}
				/>
			{/each}
		</div>

		<div class="comments" use:autoAnimate>
			{#each sortedAndFiltered.filter((c) => !c.isPinned) as comment (comment.id)}
				<Comment
					{comment}
					on:reply={handleReplyButton}
					on:login={handleLoginRequiredButton}
					on:blocked={handleRestrictedFunctionality}
					on:userinfo={handleUserInfoButton}
				/>
			{/each}
		</div>
	{:else}
		<div class="no-comments">
			<HabileNeutral />
			No comments, but you could be the first!
		</div>
	{/if}
</div>

<style lang="scss">
	.comments-page {
		margin: 2rem 0;
		border-top: 1px solid var(--color-on-surface);
	}

	.sort-and-filter {
		margin-bottom: 0.5rem;
		overflow: auto;
		max-width: 100%;
		scrollbar-width: none;

		.chips {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem;

		.title {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			align-items: center;

			h3 {
				font-size: 1.5rem;
			}
			.count {
				font-size: 0.9rem;
				color: var(--color-on-surface);
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
		gap: 1.5rem;
	}
</style>
