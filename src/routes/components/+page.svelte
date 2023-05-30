<script lang="ts">
	import { IconVideo } from '@tabler/icons-svelte';
	import Button from '$lib/components/Button.svelte';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { socials } from '$lib/data/socials';
</script>

<main>
	<h1>Components Playground</h1>

	<h2>Button</h2>

	<div class="components">
		<div class="component">
			<Button style="filled">Filled</Button>
		</div>
		<div class="component">
			<Button style="outlined">Outlined</Button>
		</div>
		<div class="component">
			<Button style="text">Text</Button>
		</div>
		<div class="component">
			<Button style="filled">
				<IconVideo />
				Icon</Button
			>
		</div>
		<div class="component">
			<Button style="filled" disabled>Disabled</Button>
		</div>
	</div>

	<h2>SocialButton</h2>

	<div class="components">
		{#each socials as social}
			<div class="component">
				<SocialButton {social} />
				{social.name}
			</div>
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		padding: 2rem;
	}

	.components {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border: 1px solid black;

		overflow: hidden;

		.component {
			border: 0.5px solid black;
			display: grid;
			place-items: center;
			width: 100%;
			padding: 2rem;
			flex: 1;
		}
	}
</style>
