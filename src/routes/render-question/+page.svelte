<script lang="ts">
	import { page } from '$app/stores';

	const identity = decodeURI($page.url.searchParams.get('identity')!);
	const question = decodeURI($page.url.searchParams.get('question')!);
</script>

<main>
	<div class="inside">
		<div class="card">
			<span class="question">
				{question}
			</span>
			<span class="answer" contenteditable="true">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</span>
		</div>

		<footer>
			<span> Posez-moi des questions anonymes! </span>
			<span class="link">clembs.com/questions</span>
		</footer>
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
			align-items: center;
		}

		footer {
			text-align: center;
			border: 1px solid black;
			border-radius: 0.4rem;
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
			width: 30rem;
			display: flex;
			flex-direction: column;

			.question,
			.answer {
				padding: 1rem;
				font-size: 1.4rem;
				font-weight: 600;
				text-align: center;
			}

			.question {
				background-color: black;
				color: white;
				border-radius: 0.4rem 0.4rem 0 0;
			}

			.answer {
				border: 1px solid black;
				border-radius: 0 0 0.4rem 0.4rem;
			}
		}
	}
</style>
