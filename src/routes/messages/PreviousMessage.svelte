<script lang="ts">
	import { colors, type Message } from '.';

	export let message: Message;
	const date = new Date(message.date!);
</script>

<div class="message">
	<div class="date" style="--color: {colors[message.color]}">
		{#if date.toDateString() === new Date().toDateString()}
			Aujourd'hui
		{:else}
			{date.getDate()}/{date.getMonth()}
		{/if}
	</div>
	<div class="content">
		{message.content}
	</div>
</div>

<style lang="scss">
	.message {
		display: flex;
		flex-direction: column;

		.date {
			background-color: var(--color);
			color: white;
			width: min-content;
			padding: 0.5rem 1rem;
			font-size: 0.9rem;
			font-weight: 600;
			border-radius: 99px 99px 99px 0;
			border: 1px solid var(--neutral);
			text-transform: lowercase;
		}
		.content {
			border: 1px solid var(--neutral);
			border-radius: 0 99px 99px 99px;
			font-size: 1.4rem;
			padding: 0.5rem 1rem;
			width: 100%;
			position: relative;
			&::before {
				position: absolute;
				bottom: 2rem;
				border-radius: 0 99px 99px 99px;
			}
		}
	}
</style>
