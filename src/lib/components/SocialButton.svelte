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
		box-shadow: 0px 0px 0px 0px black;
		border-radius: 0.5rem;
		transition: box-shadow 100ms ease-in-out, transform 100ms ease-in-out;

		&:hover {
			transform: translateY(-1px);
			box-shadow: 0px 3px 0px 0px black;
			transition: box-shadow 100ms ease-in-out, transform 100ms ease-in-out;
		}

		// &:focus-within {
		// 	outline: 5px solid #987fff;
		// }
	}
</style>
