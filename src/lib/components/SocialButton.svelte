<script lang="ts">
	import type { Social } from '$lib/data/socials';

	export let social: Social;
</script>

<a href={social.url} class="social-button" style="--bg: {social.background}">
	<img src="/assets/socials/{social.id}.svg" alt={social.name} />
</a>

<style lang="scss">
	.social-button {
		display: flex;
		height: 2rem;
		width: 2rem;
		padding: 0.3rem;
		align-items: center;
		border: 1px solid black;
		background: var(--bg);
		fill: white;
		border-radius: 0.5rem;
		transition: box-shadow 100ms ease-in-out, transform 100ms ease-in-out;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0px 3px 0px 0px black;
		}

		&:active {
			transform: translateY(0rem);
			box-shadow: 0px 1px 0px 0px black;
		}
	}
</style>
