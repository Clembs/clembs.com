<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<header>
		<h1>
			{data.hasNameChange ? 'Clember (C)' : 'Comments'}
			<Badge style="outlined">Preview</Badge>
		</h1>

		{#if data.hasNameChange}
			<InfoBox type="note"><span slot="title">yo that website is clembing or what</span></InfoBox>
		{:else}
			<InfoBox type="note">
				<span slot="title">Welcome to the Comments section!</span>
				I created this so you can leave feedback, report bugs, ask questions and be chill.<br />
				No spam or harmful content allowed. Use common sense.
			</InfoBox>
		{/if}
	</header>

	<slot />
</main>

<style lang="scss">
	header {
		margin: 1rem;

		h1 {
			display: flex;
			gap: 0.5rem;
			align-items: center;
			margin-bottom: 1rem;
		}
	}
</style>
