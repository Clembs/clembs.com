<script lang="ts">
	import { enhance } from '$app/forms';
	import { EMAIL_REGEX, OTP_REGEX } from '$lib/helpers/regex';
	import { LoaderIcon } from 'svelte-french-toast';
	import type { Comment } from '$lib/db/types';
	import CommentFormModal from '../../routes/comments/CommentFormModal.svelte';
	import Button from './Button.svelte';
	import InfoBox from './InfoBox.svelte';
	import Modal from './Modal.svelte';
	import TextInput from './TextInput.svelte';

	export let showModal = false;
	export let email = '';
	export let skipToComment = false;
	export let parentComment: Comment | null = null;

	let otp = '';
	let error = '';
	let otpEmailSent = false;
	let loading = false;

	let showCommentFormModal = false;
</script>

{#if skipToComment}
	<CommentFormModal on:close bind:showModal={showCommentFormModal} {parentComment} />
{/if}

{#if showModal}
	<Modal bind:showModal>
		<h1 slot="title">Sign in to clembs.com</h1>

		<p>Like comments and get yours verified and personalized with a clembs.com account!</p>
		<p>Create an account or log back into it, no passwords required!</p>

		<form
			action={otpEmailSent ? '/account?/verifyOTP' : '/account?/login'}
			use:enhance={() => {
				error = '';
				loading = true;

				return async ({ action, result, update }) => {
					loading = false;

					console.log(result);

					if (result.type === 'redirect' && result.location === '/account') {
						showModal = false;
						return;
					}
					if (result.type === 'failure') {
						error = result.data?.message;
						return;
					}
					if (result.type === 'error') {
						error = result.error?.message;
						return;
					}
					if (action.search === '?/login' && result.type === 'success') {
						otpEmailSent = true;
					}
					if (action.search === '?/verifyOTP' && result.type === 'success') {
						showModal = false;
					}
					if ('message' in result) {
						error = String(result.message);
					}

					update({
						reset: false,
					});
				};
			}}
			method="post"
		>
			<TextInput
				bind:value={email}
				name="email"
				label="Email"
				type="email"
				placeholder="example@clembs.com"
				required={true}
				readonly={otpEmailSent}
				pattern={EMAIL_REGEX}
			/>

			{#if otpEmailSent}
				<TextInput
					bind:value={otp}
					name="otp"
					label="One-time password"
					type="number"
					placeholder="000000"
					required={true}
					maxlength={999999}
					pattern={OTP_REGEX}
				/>
			{/if}

			<div class="actions">
				{#if error}
					<InfoBox type="danger">
						<div slot="title">An error occured.</div>
						{error}
					</InfoBox>
				{:else if otpEmailSent}
					<InfoBox type="success">
						<div class="title">One-time password sent!</div>
						To log in, simply enter the code sent to you via email.
					</InfoBox>
				{/if}

				{#if !otpEmailSent}
					<Button type="submit" disabled={otpEmailSent || !EMAIL_REGEX.test(email)} inline={false}>
						{#if loading}
							<LoaderIcon />
						{:else}
							{otpEmailSent ? 'Log in' : 'Send one-time password'}
						{/if}
					</Button>
				{:else}
					<Button type="submit" disabled={!OTP_REGEX.test(otp)} inline={false}>
						{#if loading}
							<LoaderIcon />
						{:else}
							{otpEmailSent ? 'Log in' : 'Send one-time password'}
						{/if}
					</Button>
				{/if}
				{#if skipToComment}
					<Button
						style="text"
						inline={false}
						on:click={() => {
							showModal = false;
							showCommentFormModal = true;
						}}
					>
						Write anonymously
					</Button>
				{/if}
			</div>
		</form>
	</Modal>
{/if}

<style lang="scss">
	.actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}
</style>
