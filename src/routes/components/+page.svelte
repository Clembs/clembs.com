<script lang="ts">
	import IconVideo from '@tabler/icons-svelte/dist/svelte/icons/IconVideo.svelte';
	import IconNotification from '@tabler/icons-svelte/dist/svelte/icons/IconNotification.svelte';
	import Button from '$lib/components/Button.svelte';
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { socials } from '$lib/data/socials';
	import Badge from '$lib/components/Badge.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Key from '$lib/components/Key.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GradientAvatar from '$lib/components/GradientAvatar/GradientAvatar.svelte';
	import Card from '$lib/components/Card.svelte';
	import LoginModal from '$lib/components/Settings/LoginModal.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import ToggleAvatar from '$lib/components/ToggleAvatar.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';

	let showNormalModal = false;
	let showLoginModal = false;
	let skipToComment = false;
</script>

<main>
	<h1>Components Playground</h1>

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

	<h2>Card</h2>

	<div class="components">
		<div class="component">
			<Card href="#">
				<img
					loading="lazy"
					class="card-image"
					src="https://c.clembs.com/branding/clembs/clembs.webp"
					alt="Clembs"
				/>
				<div slot="card-content">Hello</div>
			</Card>
		</div>
	</div>

	<h2>Chip</h2>

	<div class="components">
		<div class="component">
			<Chip checked={false}>Default</Chip>
		</div>
		<div class="component">
			<Chip checked={true}>Checked</Chip>
		</div>
	</div>

	<h2>Footer</h2>

	<div class="components">
		<div class="component">
			<Footer />
		</div>
	</div>

	<h2>GradientAvatar</h2>

	<div class="components">
		{#each ['User5522', 'Clembs', 'Navy'] as name, i}
			<div class="component">
				<GradientAvatar
					user={{ email: name, id: i.toString(), username: name }}
					size="{i + 1}rem"
					showBadge={i === 1}
				/>
				{name}
			</div>
		{/each}
	</div>

	<h2>InfoBox</h2>

	<div class="components">
		<div class="component">
			{#each ['Caution', 'Danger', 'Info', 'Note', 'Success'] as type}
				<InfoBox type={type.toLowerCase()}>
					<span slot="title">{type}</span>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo velit dolorem dolor exercitationem,
					nostrum veritatis ratione, sapiente consequuntur nisi distinctio molestias dolores debitis
					libero inventore tempora modi sed ipsum qui.
				</InfoBox>
			{/each}
		</div>
	</div>

	<h2>Key</h2>

	<div class="components">
		<div class="component">
			<Key modifier={true}>Ctrl</Key>
		</div>
		<div class="component">
			<Key>F</Key>
		</div>
		<div class="component">
			<span>
				<Key modifier={true}>Ctrl</Key>
				<Key modifier={true}>F</Key>
			</span>
		</div>
	</div>

	<h2>LoginModal</h2>

	<div class="components">
		<LoginModal {skipToComment} bind:showModal={showLoginModal} />
		<div class="component">
			<Button
				on:click={() => {
					skipToComment = false;
					showLoginModal = true;
				}}
			>
				Open Login Modal
			</Button>
		</div>
		<div class="component">
			<Button
				style="outlined"
				on:click={() => {
					skipToComment = true;
					showLoginModal = true;
				}}
			>
				Write anonymously option
			</Button>
		</div>
	</div>

	<h2>Modal</h2>

	<div class="components">
		<div class="component">
			<Button on:click={() => (showNormalModal = true)}>Open Modal</Button>

			<Modal bind:showModal={showNormalModal}>
				<h1>Hi</h1>
			</Modal>
		</div>
	</div>

	<h2>ShareButton</h2>

	<div class="components">
		<div class="component">
			<ShareButton url="https://clembs.com/components" />
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

	<h2>Tabs</h2>

	<div class="components">
		<div class="component">
			<Tabs
				activeTab="1"
				entries={[
					{
						id: '1',
						href: '#tab-1',
						label: 'Tab 1',
					},
					{
						id: '2',
						href: '#tab-2',
						label: 'Tab 2',
					},
				]}
			/>
		</div>
	</div>

	<h2>TextInput</h2>

	<div class="components">
		<div class="component">
			<TextInput label="Normal" value="Value" placeholder="Placeholder" />
		</div>
		<div class="component">
			<TextInput
				multiline
				label="Multiline"
				value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, qui voluptatem fuga animi nihil minima natus voluptatum perspiciatis dolores rerum tempora repellat necessitatibus explicabo vero deserunt aspernatur corporis corrupti earum."
				placeholder="Placeholder"
			/>
		</div>
		<div class="component">
			<TextInput type="number" label="Number" placeholder="50" />
		</div>
		<div class="component">
			<TextInput disabled label="Disabled" placeholder="Placeholder" />
		</div>
	</div>

	<h2>ToggleAvatar</h2>

	<div class="components">
		<div class="component">
			<ToggleAvatar />
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
		border: 1px solid var(--color-on-background);

		overflow: hidden;

		.component {
			border: 0.5px solid var(--color-on-background);
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

		.card-image {
			width: 200px;
			height: auto;
		}
	}
</style>
