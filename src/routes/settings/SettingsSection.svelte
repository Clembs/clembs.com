<section>
	<slot />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1.5rem 0;

		:global(h2) {
			margin-bottom: 1rem;
		}
	}
</style>
