<script lang="ts">
	import IconShare from '@tabler/icons-svelte/dist/svelte/icons/IconShare.svelte';
	import Button from './Button.svelte';
	import { useShare } from './useShare';

	export let url: string;
</script>

<Button style="outlined" on:click={() => useShare(url)}>
	<IconShare />
</Button>
