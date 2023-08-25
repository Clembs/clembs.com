<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import LoginModal from '$lib/components/LoginModal.svelte';
	import { LoaderIcon } from 'svelte-french-toast';
	import type { LayoutData } from '../$types';
	import EditUsernameSection from './EditUsernameSection.svelte';

	export let data: LayoutData;

	let showModal = !data?.userData;
	let signOutLoading = false;
</script>

<LoginModal bind:showModal />

<main>
	{#if data?.session && data?.userData}
		<header>
			<h1>Account details</h1>

			<p>
				Review and edit your account settings before {data.hasNameChange
					? 'clembing'
					: 'commenting'}.
			</p>

			<form
				use:enhance={() => {
					console.log('hi');
					signOutLoading = true;
					return ({ update }) => {
						signOutLoading = false;
						update();
					};
				}}
				action="?/signOut"
				method="post"
			>
				<Button style="outlined" href="/comments">
					Open {data.hasNameChange ? 'Clember' : 'Comments'}
				</Button>
				<Button style="danger" type="submit">
					{#if signOutLoading}
						<LoaderIcon />
					{:else}
						Sign out
					{/if}
				</Button>
			</form>
		</header>

		<EditUsernameSection {data} />
	{:else}
		<header>
			<h1>Welcome to clembs.com!</h1>

			<p>
				Log in to post verified comments and engage with other users.<br />
				It's entirely free and open-source, and provides an alternative <br /> to these silly, closed-source,
				ever-changing platforms!
			</p>

			<Button on:click={() => (showModal = true)}>Log in</Button>
		</header>
	{/if}
</main>

<style lang="scss">
	main {
		padding: 2.5rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 600px;
		margin: 0 auto;

		header {
			text-align: center;
		}
	}
</style>
