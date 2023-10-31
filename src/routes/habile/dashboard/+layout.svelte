<script lang="ts">
	import SideBar from './SideBar.svelte';
</script>

<div class="habile-layout">
	<SideBar />

	<slot />
</div>

<style lang="scss">
	.habile-layout {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	@media (max-width: 600px) {
		.habile-layout {
			display: flex;
			flex-direction: column;
		}
	}
</style>
