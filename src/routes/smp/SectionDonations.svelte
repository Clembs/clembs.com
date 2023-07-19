<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconExclamationCircle from '@tabler/icons-svelte/dist/svelte/icons/IconExclamationCircle.svelte';

	const dateFormatterOptions: Intl.DateTimeFormatOptions = {
		dateStyle: 'long',
		timeStyle: 'short',
	};

	const initialEndDate = new Date(Date.UTC(2023, 7, 11, 15, 0));
	let smpEndDate = initialEndDate;

	interface TimeExtension {
		label: string;
		time: number;
		href: string;
		price: number;
	}

	const timeExtensions: TimeExtension[] = [
		{
			label: '3 days',
			time: 3 * 1000 * 60 * 60 * 24,
			href: 'https://ko-fi.com/s/80346780d5',
			price: 3,
		},
		{
			label: '30 days',
			time: 1000 * 60 * 60 * 24 * 30,
			href: 'https://ko-fi.com/s/08b2d868d1',
			price: 6,
		},
		{
			label: '3 months',
			time: 3 * 1000 * 60 * 60 * 24 * 30,
			href: 'https://ko-fi.com/s/113d368e72',
			price: 15,
		},
	];
	let timeExtensionIntent: TimeExtension;
	let interval: ReturnType<typeof setInterval>;

	function setTimeExtensionIntent(newIntent: TimeExtension) {
		smpEndDate = initialEndDate;
		clearInterval(interval);
		timeExtensionIntent = newIntent;

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
	<h2>Support us to extend the server's lifetime!</h2>

	<p>
		Hosting a server isn't free, and while the first month is paid for by myself,
		I need your support to keep it alive for longer!
	</p>
	<p>
		When supporting, you will:
	</p>
	<ul>
		<li>Get a fancy &lbrack;Supporter&rbrack; prefix on their Minecraft username</li>
		<li>Get an extra Supporter role on the Discord server</li>
		<li>Extend the server's lifetime by the amount of time you paid for!</li>
	</ul>

	<div
		class="time-extensions"
	>
		{#each timeExtensions as timeExtension}
			<button
				class="time-extension"
				class:active={timeExtension === timeExtensionIntent}
				on:click={() => setTimeExtensionIntent(timeExtension)}
			>
				<div class="content">
					+{timeExtension.label}
				</div>
			</button>
		{/each}
	</div>

	<div class="server-life-card">
		{#if timeExtensionIntent}
			If extended by {timeExtensionIntent.label},
		{:else}
			Until extended,
		{/if}
		the server will continue to run until
		<time datetime={smpEndDate.toUTCString()}>
			{smpEndDate.toLocaleString(undefined, dateFormatterOptions)}
		</time>
		{#if timeExtensionIntent}
			<div class="purchase-button">
				<Button href={timeExtensionIntent.href}>Extend the server by {timeExtensionIntent.label} for {timeExtensionIntent.price}€</Button>
			</div>
		{/if}
	</div>

	<div class="discount-card">
		<div class="left-side">
			<IconExclamationCircle size={32} />
			<div class="text">
				<span class="title">
					Get 10% off any server lifetime extension!
				</span>
				<span class="subtext">
					Available until August 10. Use code SMP10 at checkout.
				</span>
			</div>
		</div>

		<Button href="https://ko-fi.com/clembs/link/SMP10">View shop</Button>
	</div>
</section>

<style lang="scss">
	.time-extensions {
		display: flex;
		margin-top: 1.5rem;

		.time-extension {
			&:is(:first-child) {
				border-top-left-radius: 1rem;
			}
			&:is(:last-child) {
				border-top-right-radius: 1rem;
			}
			&:focus-within {
				box-shadow: none;
			}
			&.active {
				transform: translateY(-0.5rem);
				background-color: hsl(221, 100%, 85%);
				.content {
					border: none;
				}
			}
			.content {
				padding: 0.5rem 1rem;
				border-bottom: 1px solid var(--color-on-background);
			}

			padding: 0;
			margin: 0;
			background-color: var(--color-background);
			font-family: inherit;
			font-size: inherit;
			border: 1px solid var(--color-on-background);
			margin-bottom: -1.1rem;
			padding-bottom: 1rem;
			text-align: center;
			width: 100%;
			transition: transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
			font-size: 1.1rem;
			font-weight: 500;
			cursor: pointer;
		}
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
		border: 1px solid var(--color-on-background);
		border-top: none;
		background-color: hsl(221, 100%, 85%);
		padding: 1.3rem 1rem;
		border-radius: 0 0 1rem 1rem;
		gap: 0.25rem;

		time {
			font-size: 1.75rem;
			max-width: 30ch;
			font-weight: 500;
		}

		.purchase-button {
			margin-top: 0.5rem;
		}
	}

	.discount-card {
		margin-top: 0.5rem;
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		background-color: hsl(46, 100%, 50%);
		border: 1px solid var(--color-on-background);
		padding: 0.75rem 1.25rem;
		border-radius: 1rem;
		gap: 0.5rem;

		.left-side {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			.text {
			display: flex;
			flex-direction: column;
			font-size: 0.8rem;

			.title {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				font-size: 1.1rem;
				font-weight: 500;
			}
		}
		}
	}
</style>
