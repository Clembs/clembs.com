<script lang="ts">
	import { IconCrown, IconSkull } from '@tabler/icons-svelte';
	import type { LanguageSchema } from '../../locales';
	import Question from '../Question.svelte';

	interface Props {
		strings: LanguageSchema;
		onchange?: (value: string) => void;
	}

	let { strings, onchange }: Props = $props();
</script>

<Question
	{onchange}
	title={strings.register.player.type.title}
	description={strings.register.player.type.description}
	choices={[
		{
			label: strings.register.player.type.premium.label,
			description: strings.register.player.type.premium.description,
			value: 'premium',
			icon: IconCrown,
		},
		{
			label: strings.register.player.type.cracked.label,
			description: strings.register.player.type.cracked.description,
			value: 'cracked',
			icon: IconSkull,
		},
	]}
/>
