<script>
	import Modal from '$lib/components/Modal.svelte';

	export let showModal = false;
</script>

<Modal bind:showModal>
	<h1 slot="title">Your account has been blocked.</h1>

	<p>
		Because you have broken the rules, some of your account's functionality has been restricted.<br
		/>
		You can no longer use this account to like comments and post your own.
	</p>
</Modal>
