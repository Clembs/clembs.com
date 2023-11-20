<script lang="ts">
	import Comment from './Comment/Comment.svelte';
	import type { Comment as CommentType, User } from '$lib/db/types';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import CommentFormModal from './CommentForm/CommentFormModal.svelte';
	import { rankComments, type CommentRankingFilters } from '$lib/helpers/rankComments';
	import Chip from '$lib/components/Chip.svelte';
	import RestrictedFunctionalityModal from './RestrictedFunctionalityModal.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
	import HabileScared from '$lib/svg/HabileScared.svelte';
	import CommentForm from './CommentForm/CommentForm.svelte';
	import Button from '$lib/components/Button.svelte';
	import { LoaderIcon } from 'svelte-french-toast';
	import { onDestroy, onMount } from 'svelte';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';

	const commentsInPage = 7;

	export let userData: User | null | undefined;
	export let parentComment: CommentType | null | undefined = null;
	export let projectId: string | null = null;
	export let userId = '';
	export let comments: CommentType[];
	export let showLoginModal = false;
	export let showReplyModal = false;
	export let showContext = false;
	export let hideCreateForm = false;

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

	let loadCommentsBtn: HTMLButtonElement;
	let areCommentsLoading = false;
	let page = 1;
	let allCommentsLoaded = comments.length < commentsInPage;

	$: sortedAndFiltered = rankComments(comments, userData, selectedSortingMode, filters);

	export let count = comments.length || 0;

	function handleReply(event: { detail: CommentType | null | undefined }) {
		selectedParentComment = event.detail;
		showReplyModal = true;
	}

	function handleShowLoginPage() {
		showLoginModal = true;
	}

	function handleRestrictedFunctionality() {
		showRestrictedFunctionalityModal = true;
	}

	async function loadMoreComments() {
		if (areCommentsLoading || allCommentsLoaded) return;

		areCommentsLoading = true;
		page = Math.ceil(comments.length / commentsInPage) + 1;

		const url = new URLSearchParams();
		url.set('page', page.toString());
		if (projectId) url.set('projectId', projectId);
		if (parentComment) url.set('parentId', parentComment.id);
		if (userId) url.set('userId', userId);

		const req = await fetch(`/comments/api/load-more?${url.toString()}`);
		const newComments = (await req.json()) as CommentType[];

		if (!newComments.length) {
			intersectionObserver.disconnect();
			allCommentsLoaded = true;
			return;
		}

		comments = [...comments, ...newComments.filter((c) => !comments.find((c2) => c2.id === c.id))];
		areCommentsLoading = false;
	}

	let intersectionObserver: IntersectionObserver;

	onMount(() => {
		if (!allCommentsLoaded) {
			intersectionObserver = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						loadMoreComments();
						console.log(page);
					}
				},
				{
					rootMargin: '0px 0px 50% 0px',
				}
			);

			intersectionObserver.observe(loadCommentsBtn);
		}
	});

	onDestroy(() => {
		intersectionObserver?.disconnect();
	});
</script>

<div class="comments-page" id="comments">
	{#if !userData}
		<LoginModal bind:showModal={showLoginModal} />
	{/if}
	<CommentFormModal
		on:login={handleShowLoginPage}
		bind:showModal={showReplyModal}
		{projectId}
		bind:parentComment={selectedParentComment}
	/>

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
					{count}
					{count === 1 ? 'comment' : 'comments'}
				</span>
			</div>
			<div class="title-account"></div>
			{#if userData}
				<Button style="outlined" href="/account">Account</Button>
			{/if}
		</div>
		{#if !hideCreateForm}
			<CommentForm
				on:login={handleShowLoginPage}
				bind:showModal={showReplyModal}
				{projectId}
				parentComment={selectedParentComment}
			/>
		{/if}
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
						{showContext}
						on:reply={handleReply}
						on:login={handleShowLoginPage}
						on:blocked={handleRestrictedFunctionality}
					/>
				{/each}

				{#if !allCommentsLoaded}
					<button
						id="load-comments-btn"
						disabled={areCommentsLoading}
						bind:this={loadCommentsBtn}
						on:click={loadMoreComments}
					>
						{#if areCommentsLoading}
							<LoaderIcon /> Loading more comments...
						{:else}
							Load more comments...
						{/if}
					</button>
				{:else}
					<div class="no-comments">
						<HabileHappy />
						You've reached the end of the comments!
					</div>
				{/if}
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
		gap: 1rem;
	}

	#load-comments-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 99rem;

		&:hover {
			background-color: var(--color-surface);
		}
	}
</style>
