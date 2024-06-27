<script lang="ts">
	export let data;
</script>

<h2>Yippee!</h2>

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
