<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { languages } from '../../../locales';

	export let data;

	$: strings = languages[data.language];
</script>

<h2>{strings.register.player.success.title}</h2>

<p>{strings.register.player.success.paragraph1}</p>

<pre>
  {data.player?.password}
</pre>

<p>{strings.register.player.success.paragraph2}</p>

<!-- <InfoBox type="note">Joining teams is coming soon!!</InfoBox> -->

<Button href="/smp/register/team">
	{strings.register.player.success.registerTeam}
</Button>
