<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import toast from 'svelte-french-toast';

	export let showModal: boolean;
	export let otp: number;
	let copied = false;

	async function copyToClipboard() {
		await navigator.clipboard
			.writeText(otp.toString())
			.catch((e) => toast.error('Failed to copy to clipboard.'));

		copied = true;
		toast.success('Copied to clipboard!');

		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<Modal bind:showModal>
	<h1 slot="title">Link your Discord profile to your clembs.com account</h1>

	<p>To use Habile Chat, and add funds to your account, link your Discord profile:</p>

	<ol>
		<li>Copy the code below</li>
		<li>
			Go to Discord and enter the
			<code>/link</code> command with your code.
		</li>
		<li>That's it! You can now enjoy Habile Chat by mentioning @Habile in any channel.</li>
	</ol>

	<div slot="buttons">
		<Button on:click={copyToClipboard} class="code">
			{#if copied}
				{otp} - Copied!
			{:else}
				{otp} - Click to copy
			{/if}
		</Button>

		<Button style="outlined" on:click={() => location.reload()}>Refresh page</Button>
	</div>
</Modal>
