<script>
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
</script>

<main>
	<HabileNeutral />

	<h1>User not found!!1</h1>

	<p>Try again. I searched far and wide...</p>
	<br />
	<br />

	<sup>* But nobody came.</sup>

	<ul>
		<li><a href="/users/Clembs">View Clembs' profile instead</a></li>
		<li>
			<a href="/comments">Comments main feed</a>
		</li>
		<li>
			<a href="/comments">Home page</a>
		</li>
	</ul>
</main>

<style lang="scss">
	@font-face {
		font-family: '8bitoperator';
		src: url('/assets/fonts/8bitoperator.ttf');
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 3rem 1rem;
		gap: 0.5rem;

		sup {
			font-size: 0.5rem;
			font-family: '8bitoperator', monospace;
		}
	}
</style>
