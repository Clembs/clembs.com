<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { Comment } from './+page.server';

	export let showModal = false;

	let content = '';
	let email = '';

	export let parentComment: Comment | null = null;
</script>

<Modal on:close bind:showModal>
	<h1 slot="title">{parentComment ? 'Reply' : 'Write a comment'}</h1>
	<form action="?/post" method="POST" use:enhance>
		<TextInput
			bind:value={content}
			name="content"
			label="Content"
			placeholder="Rate the website, ask me anything..."
			multiline
		/>

		<TextInput
			bind:value={email}
			label="Your email (optional)"
			required={false}
			type="email"
			name="email"
			placeholder="example@clembs.com"
		/>

		<Button inline={false} type="submit">Comment</Button>
	</form>
</Modal>

<Button on:click={() => (showModal = true)}>Write a comment</Button>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}
</style>
