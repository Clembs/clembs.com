<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { settingsTabs, settingsStore } from './settings';
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let dirty = false;

	$: originalSettings = $page.data.userData?.preferences;

	settingsStore?.subscribe((v) => {
		if (originalSettings && JSON.stringify(v) !== JSON.stringify(originalSettings)) {
			dirty = true;
		} else {
			dirty = false;
		}
	});

	let error: string;

	onMount(() => {
		if (!originalSettings && localStorage.getItem('preferences')) {
			originalSettings = JSON.parse(localStorage.getItem('preferences')!);
		}
	});
</script>

<main>
	<nav class:dirty>
		<ul>
			{#each settingsTabs as tab, i}
				<li class:selected={$page.url.pathname === tab.url}>
					<a href={tab.url}>
						<svelte:component this={tab.icon} />
						<span class="label">
							{tab.label}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="main-panel">
		<div class="selected-tab" transition:slide>
			<h1>{settingsTabs.find(({ url }) => $page.url.pathname === url)?.title}</h1>

			<hr />

			<slot />
		</div>
	</div>

	{#if dirty}
		<form
			transition:fly={{ opacity: 1, y: 100, duration: 150 }}
			method="POST"
			action="/settings?/updateSettings"
			class="settings-changed-bar"
			use:enhance={() =>
				async ({ result, update }) => {
					if (result.type === 'failure') {
						error = result.data?.message ?? 'Error saving settings.';
						return;
					}

					dirty = false;
					update();
				}}
		>
			<input type="hidden" name="preferences" value={JSON.stringify($settingsStore)} />
			<div class="title">
				<h3>You have unsaved changes!</h3>
				{#if error}
					<span class="error">
						{error}
					</span>
				{/if}
			</div>

			<div class="buttons">
				<Button type="submit">Save Settings</Button>
			</div>
		</form>
	{/if}
</main>

<style lang="scss">
	main {
		margin: 1rem;
		display: flex;
		gap: 1.5rem;
		height: 100%;

		nav {
			min-width: 250px;

			ul {
				display: flex;
				flex-direction: column;
				margin: 0;
				list-style: none;
				padding: 0;

				li {
					padding: 0;
					margin: 0 0 0.25rem 0;
					a {
						display: flex;
						padding: 0.5rem 0.75rem;
						gap: 0.5rem;
						align-items: center;
						width: 100%;
						border-radius: 0.75rem;
						transition: all 150ms cubic-bezier(0, 0, 0.125, 1);
						font-variation-settings: 'wght' 400;
						white-space: nowrap;
						text-decoration: none;
					}

					&:hover {
						a {
							background-color: var(--color-surface);
							font-variation-settings: 'wght' 500;
						}
					}

					&.selected {
						a {
							background-color: var(--color-on-background);
							color: var(--color-background);
							font-variation-settings: 'wght' 600;
						}
					}
				}
			}
		}

		.main-panel {
			width: 100%;

			h1 {
				margin-bottom: 1.5rem;
			}

			hr {
				height: 1px;
				color: var(--color-surface);
				margin-bottom: 1rem;
			}
		}
	}

	.settings-changed-bar {
		position: fixed;
		width: max-content;
		display: flex;
		align-items: center;
		gap: 2rem;
		background-color: var(--color-background);
		border: 1px solid var(--color-outline);
		box-shadow: 0 2px 0 0 var(--color-outline);
		left: 0;
		right: 0;
		bottom: 1rem;
		margin: 0 auto;
		padding: 0.75rem;
		padding-left: 1rem;
		border-radius: 99rem;
		z-index: 9;

		.title {
			display: flex;
			flex-direction: column;

			.error {
				font-size: 0.9rem;
				color: var(--color-error);
			}
		}

		.buttons {
			display: flex;
			gap: 0.5rem;
		}
	}

	@media (max-width: 768px) {
		main {
			flex-direction: column;

			.settings-changed-bar {
				bottom: 3rem;
			}

			nav {
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 0.25rem;
				margin: 0.5rem;
				background-color: var(--color-background);
				border: 1px solid var(--color-outline);
				z-index: 9;
				border-radius: 1rem;
				box-shadow: 0 1px 0 0 var(--color-outline);

				&.dirty {
					filter: brightness(0.7);
				}

				ul {
					flex-direction: row;
					gap: 0.5rem;

					li {
						width: 100%;
						margin: 0;

						a {
							align-items: center;
							justify-content: center;
							flex-direction: column;
							gap: 0.25rem;
							font-size: 0.9rem;
						}
					}
				}
			}
		}
	}
</style>
