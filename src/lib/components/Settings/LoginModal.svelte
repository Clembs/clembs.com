<script lang="ts">
	import { showLoginDialog } from '$lib/stores/modals';
	import Modal from '../Modal.svelte';
	import LoginForm from './LoginForm.svelte';
</script>

<Modal showModal on:close={() => showLoginDialog.set(false)}>
	<LoginForm />
</Modal>
