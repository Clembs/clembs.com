<script>
	import { socials } from '$lib/data/socials';
	import SocialButton from './SocialButton.svelte';
</script>

<footer>
	<span class="copyright">
		&copy; {new Date().getFullYear()} Clembs
	</span>

	<div class="socials">
		{#each socials as social}
			<SocialButton {social} />
		{/each}
	</div>
</footer>

<style lang="scss">
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-top: 1px solid var(--neutral);
		gap: 0.5rem;
		flex-wrap: wrap;

		.socials {
			display: flex;
			gap: 0.5rem;
		}
	}

	@media (max-width: 768px) {
		footer {
			flex-direction: column;
			justify-content: center;
		}
	}
</style>
