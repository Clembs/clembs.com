<script lang="ts">
	import {
		IconArrowBigUp,
		IconArrowBigDown,
	} from '@tabler/icons-svelte';
	import type { LegacyComment } from '$lib/db/types';

	interface Props {
		comment: LegacyComment;
		big?: boolean;
	}

	let { comment, big = false }: Props = $props();
</script>

<div
	class="vote-buttons"
	class:big
>
		<button
			aria-label="Upvote comment"
			data-action="upvote"
			disabled
		>
				<IconArrowBigUp />
		</button>

	<span class="score">
		{comment.score}
	</span>
	
		<button
			aria-label="Downvote comment"
			data-action="downvote"
			disabled
		>
				<IconArrowBigDown />
		</button>
</div>

<style lang="scss">
	.vote-buttons {
		display: flex;
		border-radius: 99rem;
		background-color: var(--color-background);
		align-items: center;
		font-size: 1rem;
		border: 1px solid var(--color-outline);
		user-select: none;
		font-weight: 500;
		opacity: 0.5;

		:global(svg) {
			height: 18px;
			width: 18px;
		}

		.score {
			text-align: center;
			min-width: 0.75rem;
			color: var(--main-color, var(--color-on-background));
		}

		button {
			display: grid;
			place-items: center;
			padding: 0.45rem;
			border-radius: 99rem;
			cursor: not-allowed;

			:global(svg) {
				transition: transform 100ms ease-in-out;
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
