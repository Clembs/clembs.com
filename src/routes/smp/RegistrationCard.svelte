<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import toast, { CheckmarkIcon } from 'svelte-french-toast';
</script>

<div class="registration-card">
	<span class="title"> The SMP is currently online.<br />Join the survival now! </span>

	<div class="button-wrapper">
		<Button on:click={() => {
			navigator.clipboard.writeText('smp.clembs.com').then(() => toast('Copied to clipboard', {
				icon: CheckmarkIcon
			}))
		}}>smp.clembs.com</Button>
		Java Edition only. Cracked accounts allowed.
	</div>
</div>

<style lang="scss">
	.registration-card {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		background-color: hsl(108, 100%, 67%);
		border: 1px solid var(--color-on-background);
		padding: 1.25rem 1rem;
		border-radius: 1rem;
		gap: 1rem;
		width: 100%;

		.title {
			font-size: 1.3rem;
			max-width: 30ch;
			font-weight: 500;
		}

		.button-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			font-size: 0.8rem;
		}
	}
</style>
