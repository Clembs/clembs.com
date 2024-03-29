<script lang="ts">
	import { page } from '$app/stores';
	import { marked } from 'marked';
</script>

<h2>Overview</h2>

<p>
	{#if $page.data.description}
		{@html marked($page.data.description)}
	{/if}
</p>
