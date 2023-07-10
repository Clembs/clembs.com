<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	const smpLaunchDate = new Date(Date.UTC(2023, 6, 12, 16, 0));
	const dateFormatterOptions: Intl.DateTimeFormatOptions = {
		dateStyle: 'long',
		timeStyle: 'short',
	};
</script>

<div class="registration-card">
	<span class="title">
		The SMP opens up on
		<br />
		<time datetime={smpLaunchDate.toUTCString()}>
			{smpLaunchDate.toLocaleString(undefined, dateFormatterOptions)}!
		</time>
	</span>

	<div class="button-wrapper">
		<Button href="https://clembs.com/smp-registration">Register now!</Button>
		Minecraft Java Edition required
	</div>
</div>

<style lang="scss">
	.registration-card {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		background-color: hsl(52, 88%, 59%);
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
