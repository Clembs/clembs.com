<script lang="ts">
	import { IconShare } from '@tabler/icons-svelte';
	import Button from './Button.svelte';
	import { useShare } from './useShare';

	interface Props {
		url: string;
	}

	let { url }: Props = $props();
</script>

<Button icon style="outlined" onclick={() => useShare(url)}>
	<IconShare />
</Button>
