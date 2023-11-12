<script lang="ts">
	import { parseMentions } from '$lib/helpers/parseMentions';
	import { marked } from 'marked';
	import Mention from './Mention.svelte';
	import type { Comment } from '$lib/db/types';
	import Emoji from '$lib/components/Emoji.svelte';
	import { findMediaLinks } from '$lib/helpers/findMediaLinks';
	import insane from 'insane';

	export let dynamicContent = true;
	export let showMedia = true;
	export let comment: Comment;

	const mediaUrl = findMediaLinks(comment.content)?.last;
</script>

<div class="comment-content">
	{#if dynamicContent}
		{#each parseMentions(comment.content) as part}
			{#if typeof part === 'string'}
				{@html insane(
					marked.parseInline(part.replace(mediaUrl ?? '', ''), {
						breaks: true,
						gfm: true,
					})
				)}
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

	{#if showMedia && !comment.projectId && mediaUrl}
		<div class="comment-media">
			{#if mediaUrl.endsWith('.mp4')}
				<!-- svelte-ignore a11y-media-has-caption -->
				<video src={mediaUrl} controls />
			{:else}
				<img
					loading="lazy"
					draggable="false"
					src={!mediaUrl.endsWith('.gif') ? `${mediaUrl}.gif` : mediaUrl}
					alt="GIF"
				/>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.comment-content {
		font-size: 15px;

		.comment-media {
			margin-top: 0.5rem;
		}
	}
</style>
