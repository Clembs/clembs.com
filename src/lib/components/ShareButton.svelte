<script lang="ts">
	import toast from 'svelte-french-toast';
	import IconCircleCheck from '@tabler/icons-svelte/dist/svelte/icons/IconCircleCheck.svelte';
	import IconCircleX from '@tabler/icons-svelte/dist/svelte/icons/IconCircleX.svelte';
	import IconShare from '@tabler/icons-svelte/dist/svelte/icons/IconShare.svelte';
	import Button from './Button.svelte';

	export let url: string;

	async function share() {
		if (navigator.share) {
			navigator.share({
				url: url,
			});
		} else {
			navigator.clipboard
				.writeText(url)
				.then((e) =>
					toast('Link copied to clipboard!', {
						icon: IconCircleCheck,
					})
				)
				.catch((e) =>
					toast('Failed to copy to clipboard.', {
						icon: IconCircleX,
					})
				);
		}
	}
</script>

<Button style="outlined" on:click={share}>
	<IconShare />
</Button>
