<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { LanguageSchema } from './locales';

	export let strings: LanguageSchema;

	let detailsModalOpen = false;
</script>

<Modal bind:showModal={detailsModalOpen}>
	<div class="details">
		<h2>{strings.about.technicals.title}</h2>

		<h3>{strings.about.technicals.config}</h3>

		<ul>
			<li>
				<a href="https://papermc.io/">Paper</a> 1.20.6 (latest build)
			</li>
			<li>
				Hosted on <a href="https://digitalocean.com/">DigitalOcean</a> (4 GB RAM, 2 VCPUs, 80 GB SSD)
			</li>
		</ul>

		<h3>{strings.about.technicals.world}</h3>

		<ul>
			<li>Difficulty: Hard</li>
			<li>Game mode: Survival</li>
			<li>Whitelist size: 40 players</li>
		</ul>

		<h3>{strings.about.technicals.plugins} & {strings.about.technicals.datapacks}</h3>

		<p>{strings.about.technicals.soon}</p>
	</div>
</Modal>

<section id="about-smp">
	<h2>{strings.about.title}</h2>

	<p>{strings.about.overview}</p>

	<p>
		{@html strings.about.registration.replace(
			'Clembs',
			'<a href="/" target="_blank" rel="noopener noreferrer">Clembs</a>'
		)}
	</p>

	<p>
		{strings.about.livestreaming}
	</p>

	<p>
		{strings.about.plugins}
	</p>

	<Button on:click={() => (detailsModalOpen = true)}>{strings.about.detailsCta}</Button>
</section>

<style lang="scss">
	.details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;

		ul {
			margin: 0;
		}
	}

	#about-smp {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		margin: 1.5rem 0;

		p {
			text-align: justify;
			// text-wrap: balance;
			max-width: 70ch;
		}

		h2 {
			font-size: 1.75rem;
			font-weight: 500;
			text-align: center;
		}
	}
</style>
