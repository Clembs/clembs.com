<script>
	import { socials } from '$lib/data/socials';
	import SocialButton from './SocialButton.svelte';
</script>

<footer>
	<div class="socials">
		{#each socials as social}
			<SocialButton {social} />
		{/each}
	</div>

	<div class="copyright">
		&copy; 2020-{new Date().getFullYear()} Clembs
	</div>
</footer>

<style lang="scss">
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border-top: 1px solid var(--color-on-background);
		gap: 0.5rem;
		flex-wrap: wrap;
		width: 100%;
		.socials {
			display: flex;
			gap: 0.5rem;
		}
	}

	@media (max-width: 600px) {
		footer {
			margin-bottom: 5rem;
		}
	}
</style>
