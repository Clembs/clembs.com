<script lang="ts">
	import { colors, type Message } from '../messages';

	const clembsAvatar =
		'https://cdn.discordapp.com/avatars/327690719085068289/d39b870ee1be24d9fe645b2eaafec2c7.png?size=2048';
	interface Props {
		type: 'ogmessage' | 'answer' | 'message';
		hasOgMessage?: boolean;
		message: Message;
	}

	let { type, hasOgMessage = false, message }: Props = $props();
</script>

<div class="message" class:answer={type === 'answer'} style="--color: {colors[message.color]}">
	<div class="avatar" class:invisible={type === 'ogmessage'}>
		{#if type === 'answer'}
			<img src={clembsAvatar} alt="" />
		{:else}
			🕵️
		{/if}
	</div>
	<div class="content {type}" class:hasOgMessage contenteditable={type === 'answer'}>
		{message.content}
	</div>
</div>

<style lang="scss">
	.message {
		display: flex;
		gap: 0.5rem;
		align-items: end;

		&.answer {
			flex-direction: row-reverse;
		}

		.avatar {
			&.invisible {
				visibility: hidden;
			}
			width: 3.2rem;
			height: 3.2rem;
			border-radius: 99px;
			box-shadow: 0px 2px 0px var(--color-on-background);
			border: 1px solid var(--color-on-background);
			background-color: var(--color);
			font-size: 2rem;
			display: grid;
			place-items: center;

			img {
				border-radius: 99px;
			}
		}

		.content {
			&.message,
			&.ogmessage {
				color: white;
				background-color: var(--color);
				border-radius: 2rem 2rem 2rem 0.5rem;
			}
			&.hasOgMessage {
				border-radius: 0.5rem 2rem 2rem 0.5rem !important;
			}
			&.answer {
				background-color: white;
				border-radius: 2rem 2rem 0.5rem 2rem;
			}

			box-shadow: 0px 2px 0px var(--color-on-background);
			max-width: 60%;
			font-size: 1.2rem;
			border: 1px solid var(--color-on-background);
			padding: 0.5rem 1.2rem;
		}
	}
</style>
