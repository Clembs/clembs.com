<script lang="ts">
	import type { Social } from '$lib/data/socials';

	export let social: Social;
</script>

<a
	href={social.url}
	class="social-button"
	aria-label="Clembs on {social.name}"
	style="--bg: {social.background}"
>
	<img src="/assets/socials/{social.id}.svg" alt={social.name} />
</a>

<style lang="scss">
	.social-button {
		display: flex;
		padding: 0.3rem;
		align-items: center;
		border: 1px solid var(--color-on-background);
		background: var(--bg);
		fill: white;
		border-radius: 0.5rem;
		transition: box-shadow 100ms ease-in-out, transform 100ms ease-in-out;

		img {
			height: 1.3rem;
			width: 1.3rem;
		}

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0px 3px 0px 0px var(--color-on-background);
		}

		&:active {
			transform: translateY(0rem);
			box-shadow: 0px 1px 0px 0px var(--color-on-background);
		}
	}
</style>
