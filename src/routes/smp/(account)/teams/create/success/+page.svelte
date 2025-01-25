<script lang="ts">
	let { data } = $props();
</script>

<h2>Team created!</h2>

<p>Your team has been created. I'll let you know when your teammates can join teams!</p>

{#if data.team.passcode}
	<p>In the meantime, you can share the team's invite code you created:</p>

	<pre>{data.team.passcode}</pre>
{:else}
	<p>
		Since it is public, once I add the functionality, everyone will be able to join. (ask Clembs to
		change that)
	</p>
{/if}
