<script lang="ts">
	import Comment from './Comment/Comment.svelte';
	import type { Comment as CommentType, User } from '$lib/db/types';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import CommentFormModal from './CommentForm/CommentFormModal.svelte';
	import { rankComments, type CommentRankingFilters } from '$lib/helpers/rankComments';
	import Chip from '$lib/components/Chip.svelte';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import UserInfoModal from '$lib/components/UserInfoModal.svelte';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
	import HabileScared from '$lib/svg/HabileScared.svelte';
	import CommentForm from './CommentForm/CommentForm.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	export let userData: User | null | undefined;
	export let parentComment: CommentType | null | undefined = null;
	export let projectId: string | null = null;
	export let comments: CommentType[];
	export let showModal = false;

	let filters: CommentRankingFilters = {
		anonymous: true,
		blocked: false,
		upvoted: false,
		mentionsMe: false,
		clembsReplied: false,
		pinned: false,
	};

	let selectedSortingMode: 'interactions' | 'recent' = 'recent';
	let selectedParentComment = parentComment;
	let showRestrictedFunctionalityModal = false;
	let showUserInfoModal = false;
	let selectedUser: User;

	$: sortedAndFiltered = rankComments(comments, userData, selectedSortingMode, filters);

	function handleReplyButton(event: { detail: CommentType | null | undefined } | undefined) {
		if (event) {
			selectedParentComment = event.detail;
		}
		showModal = true;
	}

	function handleLoginRequiredButton() {
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
			<div class="title-text">
				<h3>{projectId ? `Comments` : 'Main feed'}</h3>
				<span class="subtext">
					{sortedAndFiltered?.length || 0}
					{sortedAndFiltered?.length === 1 ? 'comment' : 'comments'}
				</span>
			</div>
			<div class="title-account"></div>
			{#if userData}
				<Tooltip>
					<span slot="tooltip-content"> Account settings </span>
					<a href="/settings">
						<GradientAvatar user={userData} showBadge={false} size="2.75rem" />
					</a>
				</Tooltip>
			{/if}
		</div>
		<CommentForm bind:showModal {projectId} parentComment={selectedParentComment} />
	</header>

	{#if comments.length}
		<div class="sort-and-filter">
			<div class="chips">
				<Chip
					checked={selectedSortingMode === 'recent'}
					on:click={() => (selectedSortingMode = selectedSortingMode = 'recent')}
				>
					🕒 Recent
				</Chip>
				<Chip
					checked={selectedSortingMode === 'interactions'}
					on:click={() => (selectedSortingMode = 'interactions')}
				>
					🔥 Popular
				</Chip>
				<span class="divider" />

				<Chip checked={filters.pinned} on:click={() => (filters.pinned = !filters.pinned)}>
					⭐ Featured
				</Chip>
				<!-- <Chip
					checked={filters.clembsReplied}
					on:click={() => (filters.clembsReplied = !filters.clembsReplied)}
				>
					💬 Clembs replied
				</Chip> -->
				{#if userData}
					<Chip checked={filters.upvoted} on:click={() => (filters.upvoted = !filters.upvoted)}>
						⬆️ Upvoted
					</Chip>
					<!-- <Chip
						checked={filters.mentionsMe}
						on:click={() => (filters.mentionsMe = !filters.mentionsMe)}
					>
						@ Mentions me
					</Chip> -->
				{/if}
				<!-- <Chip
					checked={!filters.anonymous}
					on:click={() => (filters.anonymous = !filters.anonymous)}
				>
					🕵️ Hide guests
				</Chip> -->
				<Chip checked={filters.blocked} on:click={() => (filters.blocked = !filters.blocked)}>
					🚫 Show blocked users
				</Chip>
			</div>
		</div>

		{#if sortedAndFiltered.length}
			<div class="comments" use:autoAnimate>
				{#each sortedAndFiltered as comment (comment.id)}
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
				<HabileScared />
				You've filtered too much...
			</div>
		{/if}
	{:else}
		<div class="no-comments">
			<HabileNeutral />
			No comments, but you could be the first!
		</div>
	{/if}
</div>

<style lang="scss">
	.comments-page {
		// padding: 2rem 0;
		border-top: 1px solid var(--color-on-surface);
	}

	.sort-and-filter {
		margin-bottom: 0.5rem;
		overflow: auto;
		max-width: 100%;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		&:hover {
			scrollbar-width: thin;
			::-webkit-scrollbar {
				width: 3px;
			}
		}

		.chips {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.25rem 1rem;

			.divider {
				width: 1px;
				height: 1.5rem;
				display: block;
				background-color: var(--color-on-surface);
			}
		}
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem;

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
		gap: 1rem;
	}
</style>
