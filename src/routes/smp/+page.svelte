<script lang="ts">
	import Tabs from '$lib/components/Tabs.svelte';
	import { onMount } from 'svelte';
	import RegistrationCard from './RegistrationCard.svelte';
	import SectionDonations from './SectionDonations.svelte';
	import SectionGuide from './SectionGuide.svelte';
	import SectionRules from './SectionRules.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import SectionConfiguration from './SectionConfiguration.svelte';

	const sections = ['Support', 'Guide', 'Rules', 'Configuration'] as const;
	let sectionElements: NodeListOf<Element>;
	let activeTab = '0';

	function inView(element: any) {
		var top = element.offsetTop - 25;
		var height = element.offsetHeight;

		while (element.offsetParent) {
			element = element.offsetParent;
			top += element.offsetTop - 25;
		}

		return top < window.scrollY + window.innerHeight && top + height > window.scrollY;
	}

	function update() {
		let next = false;

		sectionElements.forEach((section) => {
			if (inView(section) && !next) {
				activeTab = section.id.replace('section-', '');
				next = true;
			}
			// else {
			// }
		});
	}

	onMount(() => {
		sectionElements = document.querySelectorAll('section');
		update();
	});
</script>

<svelte:window on:scroll={update} />

<MetaTags
	pageName="About the Clembs SMP"
	image="/assets/smp/Clembs SMP.png"
	description="The Clembs SMP (Survival Multi Player) is a Minecraft server where players from around the
world come together to build, fight, survive and create!"
/>

<main>
	<header>
		<img src="/assets/smp/smp-wordmark.webp" alt="Clembs SMP" />

		<p>
			The Clembs SMP (Survival Multi Player) is a Minecraft server where players from around the
			world come together to build, fight, survive and create!
		</p>

		<RegistrationCard />
	</header>

	<div class="tabs-wrapper">
		<Tabs
			bind:activeTab
			entries={sections.map((section, index) => ({
				label: section,
				href: `#section-${index}`,
				id: index.toString(),
			}))}
		/>
	</div>

	<SectionDonations />

	<SectionGuide />

	<SectionRules />

	<SectionConfiguration />
</main>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2.5rem 1.25rem;
		text-align: center;
		gap: 1rem;

		img {
			height: 10rem;
		}

		p {
			max-width: 70ch;
		}
	}

	.tabs-wrapper {
		position: sticky;
		background-color: var(--color-background);
		top: 0;
		left: 0;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-on-background);
		z-index: 9;
	}

	:global(section) {
		margin: 2.5rem 1.25rem;
		scroll-margin-top: 5rem;
	}
</style>
