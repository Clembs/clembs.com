<script lang="ts">
	import { page } from '$app/state';
	import Message from './Message.svelte';
	let typing = false;

	const identity = decodeURI(page.url.searchParams.get('identity')!);
	const content = decodeURI(page.url.searchParams.get('question')!);
	const color = page.url.searchParams.get('color') || 'black';
	const selectedMessage = page.url.searchParams.get('selectedMessage')
		? JSON.parse(decodeURI(page.url.searchParams.get('selectedMessage')!))
		: null;
</script>

<main>
	<div class="messages">
		{#if selectedMessage}
			<Message type="ogmessage" message={selectedMessage} />
		{/if}
		<Message
			type="message"
			hasOgMessage={!!selectedMessage}
			message={{
				color,
				content,
			}}
		/>
		<div class="answer">
			<Message
				type="answer"
				message={{
					color,
					content: 'xd',
				}}
			/>
		</div>
	</div>

	{#if !typing}
		<footer>
			<span>🕵️ Messages anonymes</span>
			<span class="link">clembs.com/messages</span>
		</footer>
	{/if}
</main>

<style lang="scss">
	main {
		display: grid;
		height: 100%;
		place-items: center;
		margin: 1rem;

		.messages {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin: 1rem;
			width: 100%;
		}

		footer {
			position: fixed;
			bottom: 0;
			transform: translateY(-6.5rem);
			display: flex;
			flex-direction: column;
			text-align: center;
			border: 1px solid var(--color-on-background);
			border-radius: 0.7rem;
			font-size: 1.2rem;
			font-weight: 400;
			max-width: max-content;
			overflow: hidden;

			> * {
				padding: 0.3rem 0.8rem;
			}

			.link {
				background-color: var(--color-on-background);
				color: white;
			}
		}
	}
</style>
