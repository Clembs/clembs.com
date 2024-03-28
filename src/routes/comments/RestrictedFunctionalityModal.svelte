<script>
	import Modal from '$lib/components/Modal.svelte';
	import { showRestrictedAccountDialog } from '$lib/stores/modals';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
</script>

<Modal showModal on:close={() => showRestrictedAccountDialog.set(false)}>
	<header slot="title">
		<HabileNeutral />

		<h1>Your account has been blocked.</h1>
	</header>

	<p>
		Because you have broken the rules, some of your account's functionality has been restricted.<br
		/>
		You can no longer use this account to vote on comments and post your own.
	</p>
</Modal>

<style lang="scss">
	header {
		:global(svg) {
			height: 4rem;
			width: auto;
		}
	}
</style>
