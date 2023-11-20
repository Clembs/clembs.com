<script lang="ts">
	import { page } from '$app/stores';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { letterColors } from '$lib/components/GradientAvatar/letterColors';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import { useShare } from '$lib/components/useShare';
	import type { Comment } from '$lib/db/types';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import ActionButton from '../Comment/ActionButton.svelte';
	import CommentContent from '../Comment/CommentContent.svelte';
	import ContextBlurb from '../Comment/ContextBlurb.svelte';
	import VoteButtons from '../Comment/VoteButtons.svelte';
	import CommentFormModal from '../CommentForm/CommentFormModal.svelte';
	import Comments from '../Comments.svelte';
	import RestrictedFunctionalityModal from '../RestrictedFunctionalityModal.svelte';
	import type { PageServerData } from './$types';
	import IconLink from '@tabler/icons-svelte/dist/svelte/icons/IconLink.svelte';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';

	export let data: PageServerData;
	let selectedParentComment: Comment | null | undefined = null;
	let showReplyModal = false;
	let showLoginModal = false;
	let showRestrictedFunctionalityModal = false;

	function handleShowLoginPage() {
		showLoginModal = true;
	}

	function handleRestrictedFunctionality() {
		showRestrictedFunctionalityModal = true;
	}

	function handleReply() {
		selectedParentComment = data.comment;
		showReplyModal = true;
	}

	$: username = data.comment.author?.username ?? 'Guest';
	const date = snowflakeToDate(data.comment.id);
</script>

<MetaTags
	siteName="Clembs - Comments"
	pageName="@{username} - Comment"
	themeColor={data.comment.author?.username && letterColors[username[0].toUpperCase()]}
	description={data.comment.content.length > 50
		? `${data.comment.content.slice(0, 50)}...`
		: data.comment.content}
/>

<CommentFormModal
	on:login={handleShowLoginPage}
	bind:showModal={showReplyModal}
	projectId={data.comment.projectId}
	bind:parentComment={selectedParentComment}
/>

{#if !data.userData}
	<LoginModal bind:showModal={showLoginModal} />
{/if}

<RestrictedFunctionalityModal bind:showModal={showRestrictedFunctionalityModal} />

<article class="comment" class:pinned={data.comment.isPinned}>
	<ContextBlurb comment={data.comment}></ContextBlurb>
	<div class="comment-metadata">
		{#if data.comment.author}
			<a href="/users/{username}">
				<GradientAvatar size="2.5rem" user={data.comment.author} />
				{username}
			</a>
		{:else}
			<GradientAvatar size="2.5rem" user={data.comment.author} />
			{username}
		{/if}

		<time datetime={date.toISOString()} class="subtext">
			{dateFormat(date)}
		</time>

		{#if data.comment.isPinned}
			<span class="subtext featured"> Featured </span>
		{/if}
	</div>

	<CommentContent comment={data.comment} />

	<div class="comment-actions">
		<VoteButtons
			on:login={handleShowLoginPage}
			on:blocked={handleRestrictedFunctionality}
			big
			comment={data.comment}
		/>

		<ActionButton big on:click={handleReply}>
			<IconMessageCircle />
			Reply
		</ActionButton>

		<ActionButton big on:click={() => useShare($page.url.href)}>
			<IconLink />
			Share
		</ActionButton>
	</div>
</article>

<Comments
	comments={data.comment.childComments}
	userData={data.userData}
	parentComment={data.comment}
	projectId={data.comment.projectId}
></Comments>

<style lang="scss">
	.comment {
		margin: 0.5rem;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 1rem;
		border: 2px solid transparent;

		&.pinned {
			border: 2px solid rgb(255 0 0 / 0.1);
			background: linear-gradient(10deg, rgb(255 0 0 / 0.01), rgb(255 0 0 / 0.05));
		}

		&-metadata {
			display: flex;
			align-items: center;
			gap: 0.75rem;

			a {
				display: flex;
				align-items: center;
				gap: 0.75rem;
				color: inherit;
				font-weight: 500;
				border-radius: 99rem;
			}

			.featured {
				color: var(--color-error);
				font-weight: 500;
			}
		}

		&-actions {
			display: flex;
			align-items: center;
			gap: 0.25rem;
		}

		:global(.comment-content) {
			font-size: 1.25rem;
		}
	}
</style>
