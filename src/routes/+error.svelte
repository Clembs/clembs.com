<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import HabileScared from '$lib/icons/habile/HabileScared.svelte';

	const KonamiCode = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a',
		'Enter',
	];
	let lastKeyStrokes: string[] = $state([]);

	let showStatic = $state(true);
	let iframeLoaded = $state(false);
	let showEasterEgg = $state(false);
	let iframe: HTMLIFrameElement = $state();
</script>

<svelte:window
	onkeydown={(e) => {
		lastKeyStrokes.push(e.key);

		if (KonamiCode.every((k) => lastKeyStrokes.includes(k))) {
			showEasterEgg = true;
			setTimeout(() => {
				iframe.focus();
				iframeLoaded = true;
				showStatic = false;
			}, 1000);
			lastKeyStrokes = [];
		}
	}}
/>

<main>
	<div class="content" class:fourofour={$page.status === 404} class:easterEggShown={showEasterEgg}>
		{#if $page.status === 404}
			<div class="actual-page">
				<HabileScared />
				<!-- <img src="/assets/error-screens/404.svg" alt="404" /> -->

				<div class="message">
					<h1>Page not found</h1>
					<p>
						What you're looking for is out of this website's scope... This can mean a couple things:
					</p>
					<ul>
						<li>This page used to exist, but does not anymore.</li>
						<li>It never existed in the first place.</li>
						<li>The spelling isn't correct; ask whoever sent you here to double-check.</li>
					</ul>
				</div>
			</div>
			<div class="owowhatsthis" aria-hidden={!showEasterEgg}>
				{#if showEasterEgg}
					<div class="iframe-wrapper">
						{#if iframeLoaded || showEasterEgg}
							<iframe
								loading="lazy"
								class:hide={!showStatic}
								bind:this={iframe}
								class="dino-game"
								title="Dino game"
								src="https://wayou.github.io/t-rex-runner/"
								scrolling="no"
							></iframe>
						{/if}
					</div>
					<Button
						style="outlined"
						on:click={() => {
							showStatic = true;
							setTimeout(() => (showEasterEgg = false), 200);
						}}>go back</Button
					>
				{/if}
			</div>
		{:else}
			<div class="woopsies">
				<HabileScared />

				<h1>Error: {$page.error?.message ?? 'Unexpected error'}</h1>

				<h2>
					<pre>Status {$page.status}</pre>
				</h2>

				<pre>{JSON.stringify($page.error, null, 2)}</pre>
			</div>
		{/if}
	</div>
</main>

<style lang="scss">
	.woopsies,
	.actual-page {
		:global(svg) {
			max-width: 128px;
			height: auto;
		}
	}

	main {
		overflow-x: hidden;

		.content {
			display: flex;
			align-items: center;
			transform: translateX(0%);
			transition: transform 400ms cubic-bezier(1, 0, 0, 1);
			&.fourofour {
				width: 200%;
			}
			&.easterEggShown {
				transition: transform 400ms cubic-bezier(1, 0, 0, 1);
				transform: translateX(-50%);
			}
		}
	}
	.actual-page {
		padding: 2rem;
		gap: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: center;
		width: 100%;
		min-height: 600px;

		ul {
			text-align: left;
		}
	}

	.owowhatsthis {
		padding: 2rem;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		.iframe-wrapper {
			border: 1px solid var(--color-on-background);
			box-shadow: 0px 1px 0px 0px var(--color-on-background);
			border-radius: 1rem;
			width: 100%;
			height: 450px;
			background-image: url('/assets/tv-static.gif');
			overflow: hidden;
			.dino-game {
				border: none;
				background-color: white;
				width: 100%;
				height: 100%;

				&:not(.hide) {
					display: none;
				}
			}
		}
	}

	.woopsies {
		display: flex;
		padding: 2rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 1rem;
		min-height: 600px;

		pre {
			margin: 0;
		}
	}
</style>
