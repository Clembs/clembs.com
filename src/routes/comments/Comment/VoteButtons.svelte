<script lang="ts">
	import IconArrowBigUp from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigUp.svelte';
	import IconArrowBigDown from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigDown.svelte';
	import IconArrowBigUpFilled from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigUpFilled.svelte';
	import IconArrowBigDownFilled from '@tabler/icons-svelte/dist/svelte/icons/IconArrowBigDownFilled.svelte';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import type { Comment } from '$lib/db/types';
	import { calculateScore } from '$lib/helpers/calculateScore';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	export let showLoginModal = false;
	export let showRestrictedFunctionalityModal = false;

	export let comment: Comment;
	export let big = false;

	let data = $page.data;

	let vote = data?.userData
		? comment.score?.find((e) => e.userId === data?.userData?.id)?.type
		: null;

	const originalScore = calculateScore(comment);
	const scoreExcludingCurrentUser =
		originalScore - (vote === 'UPVOTE' ? 1 : vote === 'DOWNVOTE' ? -1 : 0);
	let currentScore = originalScore;
	let previousVote = vote;
	let previousScore = currentScore;

	function castVote(voteType: 'UPVOTE' | 'DOWNVOTE') {
		if (!data?.userData) {
			showLoginModal = true;
			return;
		}

		if (data.userData.badges?.includes('BLOCKED')) {
			showRestrictedFunctionalityModal = true;
			return;
		}
		previousVote = vote;
		previousScore = currentScore;

		if (vote === voteType) {
			vote = null;
			currentScore = scoreExcludingCurrentUser;
		} else {
			vote = voteType;
			currentScore = scoreExcludingCurrentUser + (voteType === 'UPVOTE' ? 1 : -1);
		}
	}

	function handleVoteError(result: ActionResult) {
		if (result.type === 'error') {
			resetVote();
			toast.error(`Something went wrong while trying to vote on this comment. Try again later.`);
		}
		if (result.type === 'failure') {
			resetVote();
			if (result.status === 401) {
				showLoginModal = true;
			}
			if (result.status === 403) {
				showRestrictedFunctionalityModal = true;
			}
		}
	}

	function resetVote() {
		vote = previousVote;
		currentScore = previousScore;
	}
</script>

<div
	class="vote-buttons"
	class:big
	class:voted={vote}
	style="--main-color: {!vote
		? 'var(--color-on-surface)'
		: vote === 'UPVOTE'
		? '#654fff'
		: 'var(--color-error)'}"
>
	<form
		use:enhance={() => {
			castVote('UPVOTE');
			return async ({ result, update }) => {
				handleVoteError(result);
				await update();
			};
		}}
		action="/comments/{comment.id}?/upvote"
		method="POST"
	>
		<button
			on:click|stopPropagation
			type="submit"
			aria-label="Upvote comment"
			data-action="upvote"
			class:active={vote === 'UPVOTE'}
		>
			{#if vote === 'UPVOTE'}
				<IconArrowBigUpFilled />
			{:else}
				<IconArrowBigUp />
			{/if}
		</button>
	</form>
	<span class="score">
		{currentScore}
	</span>
	<form
		use:enhance={() => {
			castVote('DOWNVOTE');
			return async ({ result, update }) => {
				handleVoteError(result);
				await update();
			};
		}}
		action="/comments/{comment.id}?/downvote"
		method="POST"
	>
		<button
			on:click|stopPropagation
			type="submit"
			aria-label="Downvote comment"
			data-action="downvote"
			class:active={vote === 'DOWNVOTE'}
		>
			{#if vote === 'DOWNVOTE'}
				<IconArrowBigDownFilled />
			{:else}
				<IconArrowBigDown />
			{/if}
		</button>
	</form>
</div>

<style lang="scss">
	.vote-buttons {
		display: flex;
		border-radius: 99rem;
		background-color: var(--color-background);
		align-items: center;
		font-size: 0.875rem;
		border: 1px solid var(--color-outline);
		user-select: none;

		:global(svg) {
			height: 16px;
			width: 16px;
		}

		&.voted {
			font-weight: 600;
			color: var(--color-on-background);
		}

		.score {
			text-align: center;
			min-width: 0.615rem;
			color: var(--main-color, var(--color-on-background));
		}

		button {
			display: grid;
			place-items: center;
			padding: 0.375rem;
			border-radius: 99rem;

			:global(svg) {
				transition: transform 100ms ease-in-out;
			}

			&:hover {
				background-color: var(--color-surface);
				:global(svg) {
					transform: scale(1.1);
				}
			}

			&:active {
				background-color: var(--color-surface);
				&[data-action='upvote'] :global(svg) {
					transform: translateY(0.15rem) scale(0.9);
				}

				&[data-action='downvote'] :global(svg) {
					transform: translateY(-0.15rem) scale(0.9);
				}
			}

			&.active {
				color: var(--main-color);

				&[data-action='upvote'] :global(svg) {
					animation: upvote 300ms ease-in-out;
				}

				&[data-action='downvote'] :global(svg) {
					animation: downvote 300ms ease-in-out;
				}
			}
		}

		@keyframes upvote {
			0%,
			20% {
				transform: translateY(0);
			}
			30%,
			70% {
				transform: translateY(-0.5rem) scale(1.2);
			}
			80%,
			100% {
				transform: translateY(0);
			}
		}

		@keyframes downvote {
			0%,
			20% {
				transform: translateY(0);
			}
			30%,
			70% {
				transform: translateY(0.5rem) scale(1.2);
			}
			80%,
			100% {
				transform: translateY(0);
			}
		}

		&.big {
			font-size: 0.95rem;

			:global(svg) {
				width: 24px !important;
				height: 24px !important;
			}
		}
	}

	@media (prefers-reduced-motion) {
		.vote-buttons {
			:global(svg) {
				transform: none !important;
				animation: none !important;
			}
		}
	}
</style>
