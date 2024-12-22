<div class="content">
	<slot />
</div>

<style lang="scss">
	.content {
		margin: 0 auto;
		max-width: 750px;
		width: 100%;
		margin: 1rem auto;
		z-index: 2;
		position: relative;
		border-radius: 1.5rem;
		border: 1px solid var(--color-outline);
		background-color: var(--color-background);

		// cancel cards view on smaller screens
		@media (max-width: 750px) {
			margin-top: 0;
			background-color: transparent;
			border: none;
			border-radius: 0;
		}
	}
</style>
