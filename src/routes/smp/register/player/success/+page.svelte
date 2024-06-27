<script lang="ts">
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;
</script>

<h2>Your account has been registered!</h2>

<p>Here's your unique password in case you need to log back in:</p>

<pre>
  {data.player?.password}
</pre>

<p>Save it somewhere safe!</p>

<InfoBox type="note">Joining teams is coming soon!!</InfoBox>

<Button href="/smp/register/team">Register a team</Button>
