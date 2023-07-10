<script lang="ts">
	import toast, { CheckmarkIcon, ErrorIcon } from 'svelte-french-toast';
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
						icon: CheckmarkIcon,
					})
				)
				.catch((e) =>
					toast('Failed to copy to clipboard.', {
						icon: ErrorIcon,
					})
				);
		}
	}
</script>

<Button style="outlined" on:click={share}>
	<IconShare />
</Button>
