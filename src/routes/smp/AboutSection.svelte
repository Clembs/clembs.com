<script>
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let detailsModalOpen = false;
</script>

<Modal bind:showModal={detailsModalOpen}>
	<div class="details">
		<h2>Technical details</h2>

		<h3>Server configuration</h3>

		<ul>
			<li>
				<a href="https://papermc.io/">Paper</a> 1.20.6 (latest build)
			</li>
			<li>
				Hosted on <a href="https://digitalocean.com/">DigitalOcean</a> (4 GB RAM, 2 VCPUs, 80 GB SSD)
			</li>
		</ul>

		<h3>World settings</h3>

		<ul>
			<li>Difficulty: Hard</li>
			<li>Game mode: Survival</li>
			<li>Whitelist size: 40 players</li>
		</ul>

		<h3>Datapacks & Plugins</h3>

		<p>Coming soon...</p>
	</div>
</Modal>

<section id="about-smp">
	<h2>About Habile SMP</h2>

	<p>
		The Habile SMP (Survival Multi Player) is a multiplayer Minecraft server where players from
		around the world come together to build, fight, survive and create!
	</p>

	<p>
		It is provided free of charge by <a href="/"> Clembs</a>. Anyone is free to register and to play
		however they want, as no specific goals are given.
	</p>

	<p>
		Livestreaming (with the #habile-smp hashtag), forming teams and engaging on the <a
			href="/discord"
		>
			Discord server
		</a> is heavily encouraged.
	</p>

	<p>
		Several plugins, behavior and terrain generation datapacks are used to enhance the vanilla
		Minecraft experience.
	</p>

	<Button on:click={() => (detailsModalOpen = true)}>View details</Button>
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
