<script lang="ts">
	import { parseMentions } from '$lib/helpers/parseMentions';
	import Mention from './Mention.svelte';
	import type { Comment } from '$lib/db/types';
	import Emoji from '$lib/components/Emoji.svelte';

	export let dynamicContent = true;
	export let comment: Comment;
</script>

<div class="comment-content">
	{#if dynamicContent}
		{#each parseMentions(comment.content) as part}
			{#if typeof part === 'string'}
				{part}
			{:else if part.type === 'user'}
				{@const user = comment.mentionedUsers?.find(({ user }) =>
					part.type === 'user' ? user.username === part.username : null
				)?.user}
				{#if user}
					<Mention node={part} />
				{:else}
					@{part.username}
				{/if}
			{:else if part.type === 'project'}
				<Mention node={part} />
			{:else if part.type === 'emoji'}
				<Emoji name={part.emojiId} src="/assets/emotes/{part.emojiId}.webp" />
			{/if}
		{/each}
	{:else}
		{comment.content}
	{/if}
</div>

<style lang="scss">
	.comment-content {
		font-size: 17px;
		margin-left: 2.5rem;
		margin-top: -0.5rem;
		word-break: break-word;
		min-width: 30ch;
	}
</style>
