<script lang="ts">
	import { languages } from '../locales';
	import { IconUser, IconUsersGroup } from '@tabler/icons-svelte';
	import Question from './Question.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;
	$: strings = languages[data.language];
</script>

{#if !data.player || !data.player.teamId}
	<Question
		title={strings.register.what.title}
		choices={[
			!data.player
				? {
						label: strings.register.what.myself.label,
						description: strings.register.what.myself.description,
						icon: IconUser,
						href: '/smp/register/player',
				  }
				: {
						label: strings.register.what.team.label,
						description: strings.register.what.team.description,
						icon: IconUsersGroup,
						href: '/smp/register/team',
				  },
		]}
	/>
{:else}
	<h2>
		{strings.register.nothing}
	</h2>
	<div class="buttons">
		<Button href="/smp">
			{strings.register.back}
		</Button>
		<Button href="/discord">
			{strings.registrationsCta}
		</Button>
	</div>
{/if}
