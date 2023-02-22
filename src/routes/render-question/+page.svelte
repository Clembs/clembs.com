<script lang="ts">
	import { page } from '$app/stores';
	import { colors } from '$lib/colors';
	let typing = false;

	const identity = decodeURI($page.url.searchParams.get('identity')!);
	const question = decodeURI($page.url.searchParams.get('question')!);
	const color = $page.url.searchParams.get('color') || 'black';
</script>

<main>
	<div class="inside">
		<div class="card">
			<div class="img-wrapper">
				<img
					src="https://cdn.discordapp.com/avatars/327690719085068289/d39b870ee1be24d9fe645b2eaafec2c7.png?size=2048"
					alt=""
				/>
			</div>
			<span class="question" style="--color: {colors[color]}">
				{question}
			</span>
			<span
				class="answer"
				contenteditable="true"
				on:focus={() => (typing = true)}
				on:focusout={() => (typing = false)}
			>
				xd
			</span>
		</div>

		{#if !typing}
			<footer>
				<span>🕵️ Questions anonymes</span>
				<span class="link">clembs.com/questions</span>
			</footer>
		{/if}
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		height: 100%;
		place-items: center;

		.inside {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin: 1rem;
			align-items: center;
		}

		footer {
			position: fixed;
			bottom: 0;
			transform: translateY(-6.5rem);
			display: flex;
			flex-direction: column;
			text-align: center;
			border: 1px solid black;
			border-radius: 0.4rem;
			font-size: 1.3rem;
			font-weight: 400;
			max-width: max-content;
			overflow: hidden;

			> * {
				padding: 0.4rem 1rem;
			}

			.link {
				background-color: black;
				color: white;
			}
		}

		.card {
			width: 100%;
			display: flex;
			flex-direction: column;
			min-width: 20rem;
			position: relative;

			.img-wrapper {
				width: 100%;
				z-index: 2;
				position: absolute;
				display: flex;
				align-items: center;
				transform: translateY(-2.6rem);
				img {
					width: 5rem;
					border-radius: 9999px;
					border: 1px solid black;
					margin: 0 auto;
				}
			}

			.question,
			.answer {
				padding: 1rem;
				font-size: 1.4rem;
				font-weight: 600;
				text-align: center;
			}

			.question {
				padding-top: 3rem;
				background-color: var(--color);
				color: white;
				border-left: 1px solid black;
				border-right: 1px solid black;
				border-top: 1px solid black;
				font-weight: 700;
				font-size: 1.5rem;
				border-radius: 0.4rem 0.4rem 0 0;
			}

			.answer {
				border: 1px solid black;
				border-radius: 0 0 0.4rem 0.4rem;
				font-weight: 400;
			}
		}
	}
</style>
