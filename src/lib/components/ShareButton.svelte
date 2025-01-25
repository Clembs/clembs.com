<script lang="ts">
	import { IconShare } from '@tabler/icons-svelte';
	import Button from './Button.svelte';
	import { useShare } from './useShare';

	export let url: string;
</script>

<Button icon style="outlined" on:click={() => useShare(url)}>
	<IconShare />
</Button>
