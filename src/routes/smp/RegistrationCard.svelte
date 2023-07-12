<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="registration-card">
	<span class="title"> The SMP is currently online.<br />Register to join the survival! </span>

	<div class="button-wrapper">
		<Button href="https://clembs.com/smp-registration">Register now!</Button>
		Java Edition only; Cracked accounts allowed.
	</div>
</div>

<style lang="scss">
	.registration-card {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		background-color: hsl(187, 88%, 59%);
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
