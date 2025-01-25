<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { Newsletter } from '$lib/db/types';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let { data, children } = $props();

	let subscriptions = $state<Newsletter[]>([]);
	let subscriptionStatus = $state();
	let subscribeLoading = $state(false);

	onMount(() => {
		const subscriptionsRaw = localStorage.getItem('newsletters_subscriptions');

		if (subscriptionsRaw) {
			subscriptions = JSON.parse(subscriptionsRaw);

			if (subscriptions.includes('discovelist')) {
				subscriptionStatus = 'subscribed';
			}
		}
	});
</script>

{@render children?.()}

<section id="newsletter">
	{#if !subscriptionStatus}
		<h3>Subscribe to the Discovelist newsletter!</h3>
		<p>
			Get the Discovelist every Sunday in your inbox. No spam, no ads, just the best of my weekly
			discoveries.
		</p>
		<form
			action="/blog/newsletter/actions?/sendSubscriptionIntent&list=discovelist"
			method="post"
			use:enhance={() => {
				subscribeLoading = true;
				return async ({ result, update }) => {
					subscribeLoading = false;
					if (result.type === 'success') {
						subscriptionStatus = 'pending-sub';
						localStorage.setItem(
							'newsletters_subscriptions',
							JSON.stringify([...subscriptions, 'discovelist']),
						);
					} else if (result.type === 'failure' && typeof result.data?.message === 'string') {
						toast.error(result.data?.message || 'An error occurred. Please try again later.');
					}

					await update();
				};
			}}
		>
			<TextInput type="email" placeholder="clembs@clembs.com" name="email" />

			{#if !subscribeLoading}
				<Button type="submit">Subscribe</Button>
			{:else}
				<Button type="submit" disabled>Subscribing...</Button>
			{/if}
		</form>
	{:else if subscriptionStatus === 'pending-sub'}
		<h3>Confirm your subscription</h3>
		<p>
			My cat robot Habile sent you an email to confirm your subscription to the newsletter, so that
			you don't abuse the system!
		</p>
	{:else if subscriptionStatus === 'subscribed'}
		<h3>You're subscribed!</h3>
		<p>
			You will receive all new Discovelist issues every Sunday.
			<br />
			To unsubscribe, look for the "Unsubscribe" link at the bottom of any newsletter email.
		</p>

		<Button
			style="outlined"
			on:click={() => {
				subscriptionStatus = null;
				localStorage.setItem(
					'newsletters_subscriptions',
					JSON.stringify(subscriptions.filter((sub) => sub !== 'discovelist')),
				);
			}}
		>
			Resubscribe
		</Button>
	{/if}
</section>

<!-- {#if data.userData?.badges?.includes('CLEMBS')}
	<form
		id="dev-actions"
		action="/blog/newsletter/actions?/send&category={data.categoryId}&post={data.slug}"
		method="post"
		use:enhance={() =>
			async ({ result }) => {
				if (result.type === 'success') {
					toast.success('Newsletter sent successfully!');
				} else {
					toast.error('An error occurred. Please try again later.');
				}
			}}
	>
		<Button type="submit">
			Send newsletter to {data.subscribers} subscribers
		</Button>
	</form>
{/if} -->

<style lang="scss">
	#newsletter {
		margin-top: 2rem;
		padding: 1rem;
		background: var(--color-surface);
		border-radius: 1rem;
		border: 1px solid var(--color-outline);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h3,
		p {
			margin: 0;
		}

		form {
			display: flex;
			gap: 1rem;
			align-items: center;
			// flex-wrap: wrap;
		}
	}

	#dev-actions {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}
</style>
