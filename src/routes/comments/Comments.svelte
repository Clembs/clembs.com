<script lang="ts">
	import Comment from './Comment.svelte';
	import type { Comment as CommentType, User } from '$lib/db/types';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import CommentFormModal from './CommentFormModal.svelte';
	import { rankComments } from '$lib/helpers/rankComments';
	import Chip from '$lib/components/Chip.svelte';
	import CreateCommentButton from './CreateCommentButton.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import UserInfoModal from '$lib/components/UserInfoModal.svelte';
	import { page } from '$app/stores';
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
		<UserInfoModal userData={selectedUser} bind:showModal={showUserInfoModal} />

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

	{#if $page.data.hasNameChange}
		<InfoBox type="note"><span slot="title">yo that website is clembing or what</span></InfoBox>
	{:else}
		<InfoBox type="note">
			<span slot="title">Welcome to the Comments section!</span>
			I created this so you can leave feedback, report bugs, ask questions and be chill.<br />
			No spam or harmful content allowed. Use common sense.
		</InfoBox>

		<InfoBox type="danger">
			<span slot="title">Comments is still in development</span>
			Let me know if anything goes wrong, or if you'd like to see a feature added ;)
		</InfoBox>
	{/if}

	<h3>{$page.data.hasNameChange ? 'Clembs' : 'Comments'} ({sortedAndFiltered?.length || 0})</h3>

	{#if comments.length}
		<div class="sort-and-filter">
			<Chip
				checked={selectedSortingMode === 'interactions'}
				on:click={() =>
					(selectedSortingMode = selectedSortingMode === 'recent' ? 'interactions' : 'recent')}
			>
				Most replied to
			</Chip>
			<Chip checked={!filters.anonymous} on:click={() => (filters.anonymous = !filters.anonymous)}>
				Hide anonymous users
			</Chip>
			<Chip checked={filters.blocked} on:click={() => (filters.blocked = !filters.blocked)}>
				Show blocked users
			</Chip>
		</div>

		<ul class="comments" use:autoAnimate>
			{#each sortedAndFiltered as comment (comment.id)}
				<Comment
					{comment}
					on:reply={handleReplyButton}
					on:login={handleLoginRequiredButton}
					on:blocked={handleRestrictedFunctionality}
					on:userinfo={handleUserInfoButton}
				/>
			{/each}
		</ul>
	{:else}
		<div class="no-comments">
			<HabileNeutral />
			No comments, but you could be the first!
		</div>
	{/if}
</div>

<style lang="scss">
	.comments-page {
		padding: 0 1rem;
		width: 100%;
		margin: 0 auto;
	}

	.sort-and-filter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		overflow-y: scroll;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
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
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
