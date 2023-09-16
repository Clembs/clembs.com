<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconArrowBigUp from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigUp.svelte';
	import IconArrowBigDown from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigDown.svelte';
	import IconArrowBigUpFilled from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigUpFilled.svelte';
	import IconArrowBigDownFilled from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigDownFilled.svelte';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import type { Comment } from '$lib/db/types';
	import { calculateScore } from '$lib/helpers/calculateScore';

	const dispatch = createEventDispatcher();

	export let comment: Comment;

	let data = $page.data;

	let vote = data?.userData
		? comment.score?.find((e) => e.userId === data?.userData?.id)?.type
		: null;

	const originalScore = calculateScore(comment);

	const scoreWithoutUser = originalScore + (vote === 'UPVOTE' ? -1 : vote === 'DOWNVOTE' ? 1 : 0);

	let score = originalScore;

	async function castVote(type: 'UPVOTE' | 'DOWNVOTE') {
		if (!data?.userData) {
			dispatch('login');
			return;
		}

		if (data.userData?.badges?.includes('BLOCKED')) {
			dispatch('blocked');
			return;
		}

		const previousVote = vote;
		const previousScore = score;
		const removeVote = vote === type;

		if (
			removeVote ||
			(type === 'UPVOTE' && previousVote === 'DOWNVOTE') ||
			(type === 'DOWNVOTE' && previousVote === 'UPVOTE')
		) {
			score = scoreWithoutUser;
		}

		vote = removeVote ? null : type;
		score += vote === null ? 0 : type === 'UPVOTE' ? 1 : -1;

		try {
			const req = await fetch(`/comments/api/${comment.id}/vote?type=${type}`, {
				method: 'PATCH',
			});

			if (req.ok) {
				return;
			}

			// return;
			vote = previousVote;
			score = previousScore;
			toast.error(`Something went wrong while trying to vote this comment. Try again later.`);
		} catch (e) {
			vote = previousVote;
			score = previousScore;
			toast.error(`Something went wrong while trying to vote this comment. Try again later.`);
		}
	}

	const upvote = () => castVote('UPVOTE');
	const downvote = () => castVote('DOWNVOTE');
</script>

<div
	class="vote-buttons"
	class:voted={vote}
	style="--main-color: {!vote
		? 'var(--color-on-surface)'
		: vote === 'UPVOTE'
		? '#654fff'
		: 'var(--color-error)'}"
>
	<button on:click={upvote} data-action="upvote" class:active={vote === 'UPVOTE'}>
		{#if vote === 'UPVOTE'}
			<IconArrowBigUpFilled />
		{:else}
			<IconArrowBigUp />
		{/if}
	</button>
	<span class="score">
		{score}
	</span>
	<button on:click={downvote} data-action="downvote" class:active={vote === 'DOWNVOTE'}>
		{#if vote === 'DOWNVOTE'}
			<IconArrowBigDownFilled />
		{:else}
			<IconArrowBigDown />
		{/if}
	</button>
</div>

<style lang="scss">
	.vote-buttons {
		display: flex;
		border-radius: 99rem;
		// background-color: var(--color-surface);
		align-items: center;
		font-weight: 500;
		font-size: 0.8rem;
		border: 1px solid var(--color-outline);
		user-select: none;

		&.voted {
			font-weight: 800;
			color: var(--color-on-background);
		}

		.score {
			text-align: center;
			min-width: 0.8rem;
			color: var(--main-color, var(--color-on-background));
		}

		button {
			display: grid;
			place-items: center;
			padding: 0.45rem;
			border-radius: 99rem;

			&:hover {
				background-color: var(--color-surface);
			}

			&.active {
				color: var(--main-color);
			}
		}

		:global(svg) {
			height: 20px;
			width: 20px;
		}
	}
</style>
