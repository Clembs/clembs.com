<script lang="ts">
	import type { LanguageSchema } from './locales';

	export let strings: LanguageSchema;
</script>

<section id="getting-started">
	<h2>{strings.gettingStarted.title}</h2>

	<ol>
		<li>
			{strings.gettingStarted.step1}
			<blockquote>
				<h4>{strings.gettingStarted.protip.title}</h4>

				<p>
					{@html strings.gettingStarted.protip.description(
						'https://modrinth.com/modpack/fabulously-optimized/versions#all-versions',
						'https://optifine.net/downloads'
					)}
				</p>
			</blockquote>
		</li>
		<li>
			{strings.gettingStarted.step2}
		</li>
		<li>
			{@html strings.gettingStarted.step3.replace('smp.clembs.com', '<code>smp.clembs.com</code>')}
		</li>
		<li>
			{strings.gettingStarted.step4}/li>
		</li>
		<li>
			{@html strings.gettingStarted.step5}
		</li>
	</ol>
</section>

<style lang="scss">
	#getting-started {
		display: flex;
		flex-direction: column;
		margin: 2rem 0;

		h2 {
			font-size: 1.75rem;
			text-align: center;
			margin-bottom: 1rem;
		}

		ol {
			margin: 0;
			padding: 0;
			list-style-position: inside;
		}

		li {
			padding: 1rem;
			border-radius: 1rem;
			border: 1px solid var(--color-outline);
			font-size: 1.25rem;
			margin-bottom: 0;

			blockquote {
				font-size: 1rem;
				margin: 0;
				padding: 1rem;
				margin-top: 1rem;
				border-radius: 0.5rem;
				background-color: var(--color-surface);
				border: 1px solid var(--color-outline);
			}
		}
	}
</style>
