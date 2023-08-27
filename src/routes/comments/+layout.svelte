<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>{data.hasNameChange ? 'Clember (C)' : 'Comments'} <Badge style="outlined">Preview</Badge></h1>
	<slot />
</main>

<style lang="scss">
	main {
		padding: 1rem;
	}
</style>
