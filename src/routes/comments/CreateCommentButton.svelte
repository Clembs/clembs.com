<script lang="ts">
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import type { users } from '$lib/db/schema';
	import type { InferModel } from 'drizzle-orm';

	export let userData: InferModel<typeof users> | null | undefined;
	export let reply = false;
</script>

<div class="create-comment-button-wrapper">
	<div class="user-avatar">
		<GradientAvatar user={userData} showBadge={false} size="3rem" />
	</div>

	<button on:click class="create-comment-button">
		{reply
			? 'Use constructive feedback, be kind and cool.'
			: 'Rate the website, ask me anything...'}
	</button>
</div>

<style lang="scss">
	.create-comment-button-wrapper {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;

		.user-avatar {
			flex: 1;
		}

		.create-comment-button {
			border: 1px solid var(--color-outline);
			background-color: transparent;
			font-family: inherit;
			font-size: inherit;
			text-align: left;
			color: var(--color-on-surface);
			width: 100%;
			padding: 0.5rem 1rem;
			border-radius: 1rem;
			cursor: pointer;

			&:hover {
				background-color: var(--color-surface);
			}
		}
	}
</style>
