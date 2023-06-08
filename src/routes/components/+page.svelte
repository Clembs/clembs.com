<script lang="ts">
	import IconVideo from '@tabler/icons-svelte/dist/svelte/icons/IconVideo.svelte';
	import IconNotification from '@tabler/icons-svelte/dist/svelte/icons/IconNotification.svelte';
	import Button from '$lib/components/Button.svelte';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { socials } from '$lib/data/socials';
	import Badge from '$lib/components/Badge.svelte';
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
				Icon
			</Button>
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

	<h2>Badge</h2>

	<div class="components">
		<div class="component">
			<Badge style="primary">Primary</Badge>
		</div>
		<div class="component">
			<Badge style="outlined">Outlined</Badge>
		</div>
		<div class="component">
			<Badge style="danger">Danger</Badge>
		</div>
		<div class="component">
			<Badge>
				<IconNotification />
				Icon
			</Badge>
		</div>
		<div class="component">
			<div class="app-wrapper">
				<div class="app-icon">C&lt;</div>
				<Badge style="danger" stickTo="right top">20</Badge>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		padding: 1.5rem;
	}

	.components {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border: 1px solid var(--neutral);

		overflow: hidden;

		.component {
			border: 0.5px solid var(--neutral);
			display: grid;
			place-items: center;
			width: 100%;
			padding: 1.5rem;
			flex: 1;
		}

		.app-wrapper {
			.app-icon {
				border: 1px;
				height: 4rem;
				width: 4rem;
				border-radius: 0.75rem;
				border: 1px solid lightgray;
				display: grid;
				place-items: center;
			}
			position: relative;
		}
	}
</style>
