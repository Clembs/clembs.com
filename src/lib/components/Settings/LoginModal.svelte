<script lang="ts">
	import Modal from '../Modal.svelte';
	import LoginForm from './LoginForm.svelte';

	export let showModal = false;
</script>

{#if showModal}
	<Modal bind:showModal>
		<LoginForm bind:showModal />
	</Modal>
{/if}
