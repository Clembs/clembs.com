<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const versionString = '3.1.3';

	let display: { h: number; w: number } = $state({ h: 0, w: 0 });
	let scroll: { x: number; y: number } = $state({ x: 0, y: 0 });
	let fps: number = $state(0);
	const times: number[] = [];

	function updateFPS() {
		requestAnimationFrame(() => {
			const now = performance.now();
			while (times.length > 0 && times[0] <= now - 1000) {
				times.shift();
			}
			times.push(now);
			fps = times.length;
			updateFPS();
		});
	}

	onMount(() => {
		display = { h: document.body.clientHeight, w: document.body.clientWidth };
		updateFPS();
	});
</script>

<svelte:window
	onresize={() => {
		display = { h: document.body.clientHeight, w: document.body.clientWidth };
	}}
	onscroll={() => {
		scroll = {
			x: document.scrollingElement?.scrollLeft || 0,
			y: document.scrollingElement?.scrollTop || 0,
		};
	}}
/>

<div class="debug-menu-wrapper">
	<div class="tiles">
		<div class="tile-group">
			<span class="tile"> Clembs.com {versionString} ({versionString}/vanilla) </span>
			<span class="tile"> {fps} fps T: inf fabulous</span>
			<span class="tile"> Multiplayer server @ 20 ms ticks </span>
			<span class="tile"> clembs:website FC: 0 </span>
		</div>
		<div class="tile-group">
			<span class="tile"> XYZ: {scroll.x} / 0 / {scroll.y} </span>
			<span class="tile"> Block: 0 0 0 </span>
			<span class="tile"> Facing: the_screen </span>
			<span class="tile">
				Page: clembs:{page.url.pathname === '/'
					? 'home'
					: page.url.pathname.replaceAll('/', '_').slice(1)}
			</span>
			<span class="tile"> Local Difficulty: 0.0 // 0.0 (Day {new Date().getDate()}) </span>
		</div>
		<div class="tile-group">
			<span class="tile"> For help : press Ctrl|⌘ + / </span>
		</div>
	</div>
	<div class="tiles right">
		<div class="tile-group">
			<span class="tile"> Display: {display.h}x{display.w} </span>
		</div>
	</div>
</div>

<style lang="scss">
	.debug-menu-wrapper {
		position: fixed;
		pointer-events: none;
		width: 100%;
		z-index: 9;
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		font-family: monospace;
		font-size: 1rem;
		inset: 0;

		.tile-group {
			margin-bottom: 0.7rem;
		}

		.tile {
			padding: 0 0.4rem;
			margin-bottom: 0.1rem;
			border: 1px solid var(--color-outline);
			border-radius: 0.2rem;
			background-color: var(--color-background);
			max-width: fit-content;
			display: flex;
			flex-direction: column;
			word-wrap: break-word;
		}
	}
</style>
