<script lang="ts">
	import { page } from '$app/stores';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import { letterColors } from '$lib/components/GradientAvatar/letterColors';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import { useShare } from '$lib/components/useShare';
	import { dateFormat } from '$lib/helpers/dateFormat';
	import { snowflakeToDate } from '$lib/helpers/snowflake';
	import ActionButton from '../Comment/ActionButton.svelte';
	import CommentContent from '../Comment/CommentContent.svelte';
	import ContextBlurb from '../Comment/ContextBlurb.svelte';
	import VoteButtons from '../Comment/VoteButtons.svelte';
	import Comments from '../Comments.svelte';
	import RestrictedFunctionalityModal from '../RestrictedFunctionalityModal.svelte';
	import type { PageServerData } from './$types';
	import IconLink from '@tabler/icons-svelte/dist/svelte/icons/IconLink.svelte';

	export let data: PageServerData;
	let showLoginModal = false;
	let showRestrictedFunctionalityModal = false;

	$: username = data.comment.author?.username ?? 'Guest';
	$: date = snowflakeToDate(data.comment.id);

	$: console.log(data.comment.parentId);
</script>

<MetaTags
	siteName="Clembs - Comments"
	pageName="@{username} - Comment"
	themeColor={data.comment.author?.username && letterColors[username[0].toUpperCase()]}
	description={data.comment.content.length > 50
		? `${data.comment.content.slice(0, 50)}...`
		: data.comment.content}
/>

{#if !data.userData}
	<LoginModal bind:showModal={showLoginModal} />
{/if}

<RestrictedFunctionalityModal bind:showModal={showRestrictedFunctionalityModal} />

<article class="comment" class:pinned={data.comment.isPinned}>
	<ContextBlurb comment={data.comment} />
	<div class="comment-metadata">
		<GradientAvatar size="2.5rem" user={data.comment.author} />
		{username}

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
			bind:showLoginModal
			bind:showRestrictedFunctionalityModal
			big
			comment={data.comment}
		/>

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
	bind:showLoginModal
	bind:showRestrictedFunctionalityModal
/>

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
