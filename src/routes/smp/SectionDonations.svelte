<script lang="ts">
	import { fly } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';

	const dateFormatterOptions: Intl.DateTimeFormatOptions = {
		dateStyle: 'long',
		timeStyle: 'short',
	};

	const initialEndDate = new Date(Date.UTC(2023, 7, 11, 16, 0));
	let smpEndDate = initialEndDate;

	interface TimeExtension {
		label: string;
		time: number;
		href: string;
	}

	const timeExtensions: TimeExtension[] = [
		{
			label: '3 days',
			time: 3 * 1000 * 60 * 60 * 24,
			href: 'https://ko-fi.com/s/80346780d5',
		},
		{
			label: '30 days',
			time: 1000 * 60 * 60 * 24 * 30,
			href: 'https://ko-fi.com/s/08b2d868d1',
		},
		{
			label: '3 months',
			time: 3 * 1000 * 60 * 60 * 24 * 30,
			href: 'https://ko-fi.com/s/113d368e72',
		},
	];
	let previousTimeExtensionIntent: TimeExtension | null;
	let timeExtensionIntent: TimeExtension | null;
	let interval: NodeJS.Timer;

	function setTimeExtensionIntent(newIntent: TimeExtension | null) {
		// if the new intent is null, reset the time
		if (!newIntent) {
			smpEndDate = initialEndDate;
			timeExtensionIntent = null;
			clearInterval(interval);
			return;
		}

		// give a previous intent to remove animation duping when hovering multiple times
		previousTimeExtensionIntent = timeExtensionIntent;
		timeExtensionIntent = newIntent;

		// if the intent is the same, don't bother animating
		if (previousTimeExtensionIntent === timeExtensionIntent) return;

		// when the server will run out + the intended time purchase
		const maxNumber = +smpEndDate + newIntent.time;

		// the animation must run for one second
		const timeoutDurationMs = 1000;

		let startTime = Date.now();
		let elapsedTime = 0;

		// this calculates the animation time and increases the date's time to reach the "maxNumber"
		interval = setInterval(() => {
			const currentTime = Date.now();
			elapsedTime += currentTime - startTime;
			startTime = currentTime;

			const remainingIncrement = maxNumber - +smpEndDate;
			const increment = (remainingIncrement / timeoutDurationMs) * elapsedTime;
			smpEndDate = new Date(+smpEndDate + increment);

			if (elapsedTime >= timeoutDurationMs) {
				clearInterval(interval);
			}
		}, 50);
	}
</script>

<section id="section-0">
	<h2>End of server & donations</h2>

	<div class="server-life-card">
		{#if timeExtensionIntent}
			If extended by {timeExtensionIntent.label},
		{:else}
			Until extended,
		{/if}
		the server will continue to run until
		<time datetime={smpEndDate.toUTCString()}>
			{smpEndDate.toLocaleString(undefined, dateFormatterOptions)}.
		</time>
		{#if timeExtensionIntent}
			<span transition:fly={{ y: 10, duration: 150 }} class="time-extension-intent">
				+{timeExtensionIntent.label}
			</span>
		{/if}
	</div>

	<h3>Donate to extend the server's length</h3>

	<p>
		Hosting a server isn't free, and while I'm paying for the first month, I need your support to
		keep it alive for longer!
		<br /> Supporters get a "&lbrack;Supporter&rbrack;" prefix on their Minecraft username, as well as
		the Supporter role on Discord &lt;3
	</p>

	<div
		class="shop"
		on:blur={() => setTimeExtensionIntent(null)}
		on:mouseout={() => setTimeExtensionIntent(null)}
	>
		{#each timeExtensions as timeExtension, i}
			<Card
				on:focus={() => setTimeExtensionIntent(timeExtension)}
				on:mouseover={() => setTimeExtensionIntent(timeExtension)}
				href={timeExtension.href}
			>
				<div slot="card-content">Extend by {timeExtension.label}</div>
			</Card>
		{/each}
	</div>
</section>

<style lang="scss">
	.shop {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
		gap: 0.5rem;
	}
	p {
		max-width: 70ch;
	}

	.server-life-card {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background-color: hsl(108, 75%, 61%);
		padding: 1.3rem 1rem;
		border-radius: 1rem;
		gap: 0.5rem;

		time {
			font-size: 1.5rem;
			max-width: 30ch;
			font-weight: 500;
		}

		.time-extension-intent {
			position: absolute;
			bottom: -20px;
			border: 1px solid var(--color-on-background);
			background-color: var(--color-background);
			padding: 0.5rem;
			border-radius: 99rem;
			box-shadow: 0 1px 0 0 var(--color-on-background);
			font-size: 0.9rem;
		}
	}
</style>
