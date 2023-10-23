<script lang="ts">
	import type { PageServerData } from './$types';
	import Store from './Store.svelte';
	import Header from './Header.svelte';
	import Usage from './Usage.svelte';
	import Settings from './Settings.svelte';

	export let data: PageServerData;
</script>

<div class="dashboard">
	<Header {data} />

	<Usage {data} />

	<Store {data} />

	<Settings {data} />

	<div class="footnotes">
		<sup>1</sup> Estimate based on the average cost of a message. The real number of messages given will
		vary based on message length.
	</div>
</div>

<style lang="scss">
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
	}
</style>
