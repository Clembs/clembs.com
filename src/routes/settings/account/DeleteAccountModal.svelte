<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import toast, { LoaderIcon } from 'svelte-french-toast';

	export let showDeleteModal = false;

	let deleteLoading = false;
</script>

{#if showDeleteModal}
	<Modal bind:showModal={showDeleteModal}>
		<h1 slot="title">Delete your account</h1>

		<p>
			Do you really want to delete your account?<br />
			The following will be <b>permanently deleted</b>:
		</p>

		<ul>
			<li>Your synced settings</li>
			<li>Your comments profile</li>
			<li>Your comments and their replies</li>
		</ul>

		<p>and that makes me very sad :(</p>

		<form
			action="/account?/deleteAccount"
			method="POST"
			slot="buttons"
			use:enhance={() => {
				deleteLoading = true;
				return ({ update }) => {
					deleteLoading = false;
					toast.success('Your account was successfully deleted.');
					update();
				};
			}}
		>
			<Button disabled={deleteLoading} type="submit" style="outlined">
				{#if deleteLoading}
					<LoaderIcon />
				{:else}
					Yes, delete everything!
				{/if}
			</Button>
			<Button
				disabled={deleteLoading}
				type="button"
				on:click={() => (showDeleteModal = false)}
				style="filled"
			>
				NEVERMIND
			</Button>
		</form>
	</Modal>
{/if}
