<script lang="ts">
	import Comment from './Comment.svelte';
	import type { Comment as CommentType, User } from '$lib/db/types';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import CommentFormModal from './CommentFormModal.svelte';
	import { rankComments } from '$lib/helpers/rankComments';
	import Chip from '$lib/components/Chip.svelte';
	import CreateCommentButton from './CreateCommentButton.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import UserInfoModal from '$lib/components/UserInfoModal.svelte';

	export let userData: User | null | undefined;
	export let parentComment: CommentType | null | undefined = null;
	export let comments: CommentType[];
	export let showModal = false;

	let filters = {
		anonymous: true,
		blocked: false,
		liked: false,
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

{#if !parentComment}
	<InfoBox type="note">
		<span slot="title">Welcome to the clembs.com comment section!</span>
		Here you can leave your feedback, ask me questions, speak between y'all, etc.<br />Basically,
		the only rule is don't be annoying (includes spam, racism, trolling, etc)!!!
	</InfoBox>

	<InfoBox type="danger">
		<span slot="title">Alpha warning</span>
		All of this is in very early development!! Let me know if anything goes wrong or you'd like to see
		any feature in particular ;)
	</InfoBox>
{/if}

<h3>Comments ({sortedAndFiltered?.length || 0})</h3>

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
	No comments yet, but you could be the first!
{/if}

<style lang="scss">
	.sort-and-filter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
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
