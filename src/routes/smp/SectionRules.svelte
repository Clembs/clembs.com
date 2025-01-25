<script lang="ts">
	import type { LanguageSchema } from './locales';

	interface Props {
		strings: LanguageSchema;
	}

	let { strings }: Props = $props();
</script>

<section id="rules">
	<h2>{strings.rules.title}</h2>

	<ol>
		<li>{strings.rules.cheats}</li>
		<li>{strings.rules.oneProfile}</li>
		<li>{strings.rules.attacks}</li>
		<li>{strings.rules.commonSense}</li>
		<li>{@html strings.rules.englishOnly}</li>
	</ol>

	<p>{@html strings.rules.everythingElse}</p>
</section>

<style lang="scss">
	#rules {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 2rem 0;

		h2 {
			font-size: 1.75rem;
			text-align: center;
		}

		ol {
			margin: 0;
		}
	}
</style>
