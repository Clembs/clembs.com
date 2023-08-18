<script lang="ts">
	import { toast } from 'svelte-french-toast';
  import type_01 from "../sounds/type_01.wav";
  import type_02 from "../sounds/type_02.wav";
  import type_03 from "../sounds/type_03.wav";
  import type_04 from "../sounds/type_04.wav";
  import type_05 from "../sounds/type_05.wav";
  import celebration from "../sounds/celebration.wav";
	import { onMount } from 'svelte';
	
	let secretCode = '';
	let win = false;
	let clicksToTrueDarkMode = 0;
	let trueDarkModeToastId: string;
	let longPressInterval: NodeJS.Timer;
	const initialTimeToReset = 3000;
	let timeRemaining = initialTimeToReset;
	let screenReset = false;

	let filterBoxInvert: HTMLDivElement;
	let filterBoxGrayscale: HTMLDivElement;

	let screenFilters = {
		// C(razy)
		rotate: false,
		// B, when not flipped
		bFalls: false,
		// d(ark mode)
		invert: false,
		// d(true ark mode)
		trueDarkMode: false,
		// M(onochrome)
		greyscale: false,
	};

	function handleC() {
		// document.body.classList.toggle('flip');
		// screenFilters.rotate = !screenFilters.rotate;
	}
	function centerFilterToLetter(selector: string, filterBoxEl: HTMLDivElement) {
		const el = document.querySelector(selector);
		const position = el?.getBoundingClientRect();

		let X = position?.x! + position?.width! / 2,
			Y = position?.y! + position?.height! / 2;

		if (screenFilters.rotate) {
			X = document.body.clientWidth - X;
		}

		filterBoxEl.style.left = `${X}px`;
		filterBoxEl.style.top = `${Y}px`;
	}
	function handleM() {
		// centerFilterToLetter('#letter_4', filterBoxGrayscale);
		// screenFilters.greyscale = !screenFilters.greyscale;
	}
	function handleB() {
		// if (!screenFilters.rotate) {
		// 	screenFilters.bFalls = !screenFilters.bFalls;
		// 	return;
		// }
		// centerFilterToLetter('#letter_5', filterBoxInvert);
		// if (clicksToTrueDarkMode < 4) {
		// 	clicksToTrueDarkMode += 1;
		// 	// document.body.classList.toggle('darkmodelol');
		// 	screenFilters.invert = !screenFilters.invert;
		// } else {
		// 	screenFilters.invert = false;
		// 	document.body.classList.remove('flip');
		// 	screenFilters.rotate = false;
		// 	document.body.classList.add('ALLSYSTEMSFULLPOWER');
		// 	screenFilters.trueDarkMode = true;
		// 	trueDarkModeToastId = toast('Ultra dark mode activated! Press Esc to escape', {
		// 		duration: Infinity,
		// 	});
		// }
	}
	function rocketScreenReset() {
		// longPressInterval = setInterval(() => {
		// 	if (timeRemaining !== 0) {
		// 		timeRemaining -= 1000;
		// 	} else {
		// 		clearInterval(longPressInterval);
		// 		screenReset = true;
		// 	}
		// }, 1000);
	}
	function rocketScreenCancel() {
		// timeRemaining = initialTimeToReset;
		// clearInterval(longPressInterval);
	}

	const randomSound = () => [type_01, type_02, type_03, type_04, type_05].sort(Math.random)[0];
	let audios: Record<string, HTMLAudioElement>;
	let celebrationAudio: HTMLAudioElement;

	onMount(() => {
		audios = 'clembs'.split('').reduce((acc, l) => ({ ...acc, [l]: new Audio(randomSound()) }), {});
		celebrationAudio = new Audio(celebration);
	})
	// const typeSound = useSound([type_01, type_02, type_03, type_04, type_05].sort(Math.random)[0], ['keydown']);

</script>

<svelte:window
	on:keydown={(e) => {
		if (!win) {
			if ('clembs'.startsWith(`${secretCode}${e.key}`)) {
				secretCode += e.key;
				audios[e.key].play();
			} else {
				secretCode = '';
			}
			if (secretCode === 'clembs') {
				win = true;
				celebrationAudio.play()
			}
		}
		if (e.key === 'Escape' && screenFilters.trueDarkMode) {
			screenFilters.trueDarkMode = false;
			document.body.classList.toggle('ALLSYSTEMSFULLPOWER');
			clicksToTrueDarkMode = 0;
			toast.dismiss(trueDarkModeToastId);
		}
	}}
/>

<div class="filter-wrapper" aria-hidden="true">
	<div
		class="filter-box darkmodelol"
		class:expand={screenFilters.invert}
		bind:this={filterBoxInvert}
	/>
	<div
		class="filter-box monochrome"
		class:expand={screenFilters.greyscale}
		bind:this={filterBoxGrayscale}
	/>
</div>

<div class="wordmark-wrapper">
	<div class="wordmark" class:easter-egg={win}>
		<span aria-hidden="true" style="height: 0; opacity: 0;">Clembs</span>
		<svg
			aria-label="Clembs"
			class="front"
			viewBox="0 0 336 81"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="wordmark">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<g
					id="letter"
					on:click={handleC}
					class:eg-hint={secretCode.startsWith('c') && secretCode !== 'clembs'}
					style="--index: 1;"
				>
					<path
						id="C"
						d="M22.724 78.977C17.1893 77.0363 12.2911 73.6182 8.56 69.093C4.56356 64.1814 1.89565 58.3256 0.812002 52.087C-0.519954 45.8969 -0.239665 39.4686 1.626 33.418C3.38245 27.8344 6.62533 22.834 11.007 18.953C15.6361 14.9302 21.2761 12.2484 27.318 11.197C31.6783 10.3093 36.1709 10.2916 40.538 11.145C44.6872 11.9582 48.6386 13.5708 52.172 15.893C55.6299 18.154 58.5999 21.0846 60.907 24.512L49.695 31.331C48.2101 29.2441 46.3547 27.4477 44.221 26.031C42.1277 24.6412 39.7929 23.6553 37.337 23.124C34.7974 22.5845 32.174 22.5736 29.63 23.092C25.968 23.7403 22.5758 25.4464 19.872 28C17.2205 30.5417 15.318 33.7629 14.372 37.312C13.3364 41.3003 13.2518 45.476 14.125 49.503C14.8327 53.5839 16.4972 57.4392 18.982 60.753C21.2185 63.7079 24.2244 65.9911 27.671 67.353C31.1858 68.7038 35.0172 69.0054 38.7 68.221C41.2805 67.7531 43.726 66.7216 45.862 65.2C47.9144 63.7127 49.6643 61.8478 51.018 59.705C52.4182 57.4927 53.4307 55.0578 54.012 52.505L66.944 54.533C66.1134 58.697 64.4685 62.6559 62.1038 66.1825C59.739 69.709 56.7009 72.7337 53.164 75.083C49.4178 77.551 45.214 79.2411 40.802 80.053C38.3815 80.5326 35.9205 80.7784 33.453 80.787C29.7994 80.802 26.1704 80.1898 22.724 78.977Z"
						fill="url(#paint0_linear_24_9)"
					/>
				</g>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<g
					id="letter_2"
					class:eg-hint={secretCode.startsWith('cl') && secretCode !== 'clembs'}
					style="--index: 2;"
				>
					<path
						id="l"
						d="M64.601 78.7059L71.401 2.06592L84.147 3.18092L77.347 79.8209L64.601 78.7059Z"
						fill="url(#paint1_linear_24_9)"
					/>
				</g>
				<g
					id="letter_3"
					class:eg-hint={secretCode.startsWith('cle') && secretCode !== 'clembs'}
					style="--index: 3;"
				>
					<path
						id="e"
						d="M96.81 74.6531C92.8121 73.2525 89.2752 70.7814 86.585 67.5091C83.6927 63.9433 81.7623 59.6959 80.978 55.1721C80.0084 50.6721 80.2402 45.9962 81.65 41.6141C82.9953 37.5373 85.4302 33.9063 88.691 31.1141C92.1766 28.1794 96.378 26.2215 100.867 25.4401C104.918 24.6332 109.116 24.9985 112.967 26.4931C117.096 28.1354 120.69 30.8883 123.351 34.4471C126.565 38.7951 128.697 43.8461 129.571 49.1821L116.823 51.6591L95.257 55.8521C95.7533 57.2792 96.503 58.6051 97.47 59.7661C98.8365 61.405 100.649 62.6131 102.687 63.2441C104.722 63.8701 106.881 63.9767 108.967 63.5541C111.118 63.2346 113.118 62.2596 114.694 60.7621C116.024 59.4058 116.974 57.723 117.448 55.8831L130.132 58.1561C129.3 60.9984 127.983 63.6757 126.24 66.0701C124.454 68.4726 122.187 70.4769 119.584 71.9551C116.57 73.6452 113.293 74.8171 109.891 75.4221C108.129 75.7715 106.337 75.9507 104.54 75.9571C101.908 75.9668 99.2934 75.5258 96.81 74.6531ZM102.556 36.6621C100.457 36.9993 98.4966 37.9279 96.906 39.3391C95.4329 40.7686 94.4625 42.6369 94.14 44.6641C94.063 45.0701 94.003 45.4921 93.961 45.9331L113.721 42.0931C113.677 42.0181 113.634 41.9451 113.59 41.8721C112.492 39.8328 110.773 38.1959 108.683 37.1981C107.469 36.6861 106.163 36.4259 104.845 36.4331C104.076 36.4358 103.309 36.5129 102.555 36.6631L102.556 36.6621Z"
						fill="url(#paint2_linear_24_9)"
					/>
				</g>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<g
					id="letter_4"
					on:click={handleM}
					class:eg-hint={secretCode.startsWith('clem') && secretCode !== 'clembs'}
					style="--index: 4;"
				>
					<path
						id="m"
						d="M192.11 79.0071L195.564 54.4401C196.039 51.8773 196.009 49.2465 195.477 46.6951C195.097 45.0186 194.197 43.5052 192.905 42.3711C191.581 41.3347 189.994 40.6879 188.323 40.5031C185.07 39.9811 182.419 40.6197 180.372 42.4191C178.325 44.2184 177.018 47.1337 176.452 51.1651L172.917 76.3091L160.249 74.5291L163.702 49.9611C164.172 47.4022 164.159 44.778 163.663 42.2241C163.305 40.5385 162.401 39.0181 161.091 37.8991C159.778 36.8761 158.21 36.2328 156.557 36.0391C153.304 35.5164 150.653 36.1551 148.606 37.9551C146.559 39.7551 145.251 42.6704 144.683 46.7011L141.151 71.8461L128.483 70.0641L135.227 22.0801L147.127 23.7521L146.783 30.2991C148.228 28.588 149.995 27.1773 151.983 26.1471C155.043 24.618 158.507 24.093 161.883 24.6471C167.701 25.4691 171.912 27.8731 174.515 31.8591C175.566 33.5071 176.308 35.3325 176.706 37.2461C178.423 34.4352 180.871 32.1441 183.79 30.6181C186.87 29.0975 190.347 28.5766 193.737 29.1281C199.559 29.9461 203.756 32.3461 206.328 36.3281C208.9 40.3101 209.669 45.9801 208.636 53.3381L204.778 80.7871L192.11 79.0071Z"
						fill="url(#paint3_linear_24_9)"
					/>
				</g>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<g
					id="letter_5"
					on:click={handleB}
					class:fall={screenFilters.bFalls}
					class:eg-hint={secretCode.startsWith('clemb') && secretCode !== 'clembs'}
					style="--index: 5;"
				>
					<path
						id="b"
						d="M204.237 1.337L216.959 0L220.59 34.538C221.547 32.6483 222.837 30.9464 224.398 29.514C227.169 27.0813 230.659 25.62 234.337 25.352C238.382 24.8228 242.494 25.4732 246.178 27.225C249.706 29.0016 252.65 31.7527 254.661 35.152C257.001 39.1754 258.407 43.6738 258.773 48.314C259.367 52.9136 258.926 57.5877 257.482 61.995C256.234 65.7567 253.926 69.0783 250.837 71.561C247.598 74.0401 243.713 75.5315 239.647 75.856C235.993 76.3582 232.274 75.6539 229.057 73.85C227.141 72.7164 225.457 71.2306 224.094 69.471L224.294 76.299L212.249 77.566L204.237 1.337ZM232.393 37.444C230.299 37.635 228.312 38.4553 226.693 39.797C225.055 41.1714 223.828 42.9706 223.146 44.997C222.384 47.2723 222.139 49.689 222.429 52.071L222.443 52.205C222.66 54.6089 223.404 56.9356 224.621 59.02C225.693 60.8707 227.251 62.3924 229.127 63.42C230.969 64.4016 233.069 64.793 235.141 64.541C237.312 64.355 239.379 63.5272 241.078 62.163C242.757 60.7731 244.031 58.9559 244.764 56.903C245.591 54.5989 245.865 52.1325 245.564 49.703C245.356 47.2703 244.594 44.9174 243.337 42.824C242.229 40.9689 240.618 39.4656 238.691 38.488C237.168 37.7363 235.489 37.3533 233.791 37.37C233.324 37.3703 232.857 37.395 232.393 37.444Z"
						fill="url(#paint4_linear_24_9)"
					/>
				</g>
				<g id="letter_6" style="--index: 6;">
					<path
						id="s"
						d="M275.83 78.278C273.066 78.0525 270.37 77.3011 267.888 76.064C265.435 74.8263 263.288 73.0586 261.603 70.889L271.01 63.35C272.394 64.608 274.027 65.5618 275.803 66.15C277.753 66.8118 279.855 66.8789 281.843 66.343C283.473 66.0173 285.008 65.3271 286.334 64.324C286.78 64.0092 287.122 63.5677 287.315 63.0567C287.508 62.5456 287.544 61.9884 287.417 61.457C287.321 60.9486 287.084 60.4774 286.733 60.0969C286.382 59.7165 285.932 59.4421 285.433 59.305C284.141 58.9679 282.808 58.8127 281.473 58.844L276.865 58.799C272.607 58.904 268.399 57.8645 264.68 55.789C263.164 54.9439 261.837 53.7975 260.781 52.4205C259.725 51.0435 258.962 49.465 258.538 47.782C257.338 42.9553 257.975 38.835 260.45 35.421C262.925 32.007 267.016 29.5883 272.725 28.165C275.516 27.4438 278.408 27.1957 281.281 27.431C283.869 27.6293 286.396 28.3208 288.725 29.468C290.814 30.4754 292.585 32.0377 293.846 33.984L284.769 41.241C284.305 40.6209 283.713 40.1069 283.035 39.7336C282.356 39.3602 281.605 39.136 280.833 39.076C279.057 38.7737 277.237 38.8367 275.486 39.261C274.118 39.5168 272.871 40.2137 271.936 41.245C271.577 41.6784 271.329 42.193 271.213 42.744C271.098 43.2951 271.119 43.866 271.275 44.407C271.397 44.8283 271.631 45.2085 271.952 45.5067C272.274 45.8048 272.671 46.0096 273.1 46.099C274.406 46.4491 275.757 46.6005 277.108 46.548L283.595 46.529C286.474 46.433 289.334 47.0406 291.925 48.299C294.073 49.3689 295.946 50.9185 297.399 52.828C298.684 54.5111 299.622 56.4331 300.157 58.482C300.871 61.1751 300.65 64.0309 299.53 66.582C298.318 69.2692 296.415 71.587 294.015 73.299C291.2 75.3202 288.011 76.7605 284.633 77.536C282.467 78.0864 280.241 78.3692 278.006 78.378C277.276 78.3753 276.551 78.342 275.83 78.278Z"
						fill="url(#paint5_linear_24_9)"
					/>
				</g>
				<g
					id="letter_7"
					style="--index: 7; --timeRemaining: {timeRemaining}"
					class:wiggle={timeRemaining !== initialTimeToReset}
					class:animate={timeRemaining === 0}
					on:mousedown={rocketScreenReset}
					on:mouseup={rocketScreenCancel}
				>
					<path
						id="arrow"
						d="M309.009 45.9339L335.209 19.7339V72.1419L309.009 45.9339Z"
						fill="url(#paint6_linear_24_9)"
					/>
				</g>
			</g>
			<defs>
				<linearGradient
					id="paint0_linear_24_9"
					x1="66.944"
					y1="42.8417"
					x2="-0.0154995"
					y2="43.2884"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#6751FF" />
					<stop offset="1" stop-color="#9876FF" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_24_9"
					x1="84.147"
					y1="43.6648"
					x2="64.6007"
					y2="43.6845"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#6252FF" />
					<stop offset="1" stop-color="#6952FF" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_24_9"
					x1="130.132"
					y1="50.4895"
					x2="80.3896"
					y2="50.4895"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#595FFF" />
					<stop offset="1" stop-color="#6352FF" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_24_9"
					x1="209.08"
					y1="69.8676"
					x2="128.483"
					y2="69.8676"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#4875FF" />
					<stop offset="1" stop-color="#595FFF" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_24_9"
					x1="259.029"
					y1="49.332"
					x2="204.237"
					y2="49.4094"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#3E82FF" />
					<stop offset="1" stop-color="#4874FF" />
				</linearGradient>
				<linearGradient
					id="paint5_linear_24_9"
					x1="300.568"
					y1="60.4654"
					x2="257.013"
					y2="60.4654"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#36A2FF" />
					<stop offset="1" stop-color="#3E82FF" />
				</linearGradient>
				<linearGradient
					id="paint6_linear_24_9"
					x1="335.209"
					y1="45.9379"
					x2="309.009"
					y2="45.9379"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#31C0FF" />
					<stop offset="1" stop-color="#35AAFF" />
				</linearGradient>
			</defs>
		</svg>
		<svg
			class="back"
			viewBox="0 0 336 81"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<g id="wordmark" fill="var(--color-on-background)">
				<g id="letter">
					<path
						id="C"
						d="M22.724 78.977C17.1893 77.0363 12.2911 73.6182 8.56 69.093C4.56356 64.1814 1.89565 58.3256 0.812002 52.087C-0.519954 45.8969 -0.239665 39.4686 1.626 33.418C3.38245 27.8344 6.62533 22.834 11.007 18.953C15.6361 14.9302 21.2761 12.2484 27.318 11.197C31.6783 10.3093 36.1709 10.2916 40.538 11.145C44.6872 11.9582 48.6386 13.5708 52.172 15.893C55.6299 18.154 58.5999 21.0846 60.907 24.512L49.695 31.331C48.2101 29.2441 46.3547 27.4477 44.221 26.031C42.1277 24.6412 39.7929 23.6553 37.337 23.124C34.7974 22.5845 32.174 22.5736 29.63 23.092C25.968 23.7403 22.5758 25.4464 19.872 28C17.2205 30.5417 15.318 33.7629 14.372 37.312C13.3364 41.3003 13.2518 45.476 14.125 49.503C14.8327 53.5839 16.4972 57.4392 18.982 60.753C21.2185 63.7079 24.2244 65.9911 27.671 67.353C31.1858 68.7038 35.0172 69.0054 38.7 68.221C41.2805 67.7531 43.726 66.7216 45.862 65.2C47.9144 63.7127 49.6643 61.8478 51.018 59.705C52.4182 57.4927 53.4307 55.0578 54.012 52.505L66.944 54.533C66.1134 58.697 64.4685 62.6559 62.1038 66.1825C59.739 69.709 56.7009 72.7337 53.164 75.083C49.4178 77.551 45.214 79.2411 40.802 80.053C38.3815 80.5326 35.9205 80.7784 33.453 80.787C29.7994 80.802 26.1704 80.1898 22.724 78.977Z"
					/>
				</g>
				<g id="letter_2">
					<path
						id="l"
						d="M64.601 78.7059L71.401 2.06592L84.147 3.18092L77.347 79.8209L64.601 78.7059Z"
					/>
				</g>
				<g id="letter_3">
					<path
						id="e"
						d="M96.81 74.6531C92.8121 73.2525 89.2752 70.7814 86.585 67.5091C83.6927 63.9433 81.7623 59.6959 80.978 55.1721C80.0084 50.6721 80.2402 45.9962 81.65 41.6141C82.9953 37.5373 85.4302 33.9063 88.691 31.1141C92.1766 28.1794 96.378 26.2215 100.867 25.4401C104.918 24.6332 109.116 24.9985 112.967 26.4931C117.096 28.1354 120.69 30.8883 123.351 34.4471C126.565 38.7951 128.697 43.8461 129.571 49.1821L116.823 51.6591L95.257 55.8521C95.7533 57.2792 96.503 58.6051 97.47 59.7661C98.8365 61.405 100.649 62.6131 102.687 63.2441C104.722 63.8701 106.881 63.9767 108.967 63.5541C111.118 63.2346 113.118 62.2596 114.694 60.7621C116.024 59.4058 116.974 57.723 117.448 55.8831L130.132 58.1561C129.3 60.9984 127.983 63.6757 126.24 66.0701C124.454 68.4726 122.187 70.4769 119.584 71.9551C116.57 73.6452 113.293 74.8171 109.891 75.4221C108.129 75.7715 106.337 75.9507 104.54 75.9571C101.908 75.9668 99.2934 75.5258 96.81 74.6531ZM102.556 36.6621C100.457 36.9993 98.4966 37.9279 96.906 39.3391C95.4329 40.7686 94.4625 42.6369 94.14 44.6641C94.063 45.0701 94.003 45.4921 93.961 45.9331L113.721 42.0931C113.677 42.0181 113.634 41.9451 113.59 41.8721C112.492 39.8328 110.773 38.1959 108.683 37.1981C107.469 36.6861 106.163 36.4259 104.845 36.4331C104.076 36.4358 103.309 36.5129 102.555 36.6631L102.556 36.6621Z"
					/>
				</g>
				<g id="letter_4">
					<path
						id="m"
						d="M192.11 79.0071L195.564 54.4401C196.039 51.8773 196.009 49.2465 195.477 46.6951C195.097 45.0186 194.197 43.5052 192.905 42.3711C191.581 41.3347 189.994 40.6879 188.323 40.5031C185.07 39.9811 182.419 40.6197 180.372 42.4191C178.325 44.2184 177.018 47.1337 176.452 51.1651L172.917 76.3091L160.249 74.5291L163.702 49.9611C164.172 47.4022 164.159 44.778 163.663 42.2241C163.305 40.5385 162.401 39.0181 161.091 37.8991C159.778 36.8761 158.21 36.2328 156.557 36.0391C153.304 35.5164 150.653 36.1551 148.606 37.9551C146.559 39.7551 145.251 42.6704 144.683 46.7011L141.151 71.8461L128.483 70.0641L135.227 22.0801L147.127 23.7521L146.783 30.2991C148.228 28.588 149.995 27.1773 151.983 26.1471C155.043 24.618 158.507 24.093 161.883 24.6471C167.701 25.4691 171.912 27.8731 174.515 31.8591C175.566 33.5071 176.308 35.3325 176.706 37.2461C178.423 34.4352 180.871 32.1441 183.79 30.6181C186.87 29.0975 190.347 28.5766 193.737 29.1281C199.559 29.9461 203.756 32.3461 206.328 36.3281C208.9 40.3101 209.669 45.9801 208.636 53.3381L204.778 80.7871L192.11 79.0071Z"
					/>
				</g>
				<g id="letter_5" class:fall={screenFilters.bFalls}>
					<path
						id="b"
						d="M204.237 1.337L216.959 0L220.59 34.538C221.547 32.6483 222.837 30.9464 224.398 29.514C227.169 27.0813 230.659 25.62 234.337 25.352C238.382 24.8228 242.494 25.4732 246.178 27.225C249.706 29.0016 252.65 31.7527 254.661 35.152C257.001 39.1754 258.407 43.6738 258.773 48.314C259.367 52.9136 258.926 57.5877 257.482 61.995C256.234 65.7567 253.926 69.0783 250.837 71.561C247.598 74.0401 243.713 75.5315 239.647 75.856C235.993 76.3582 232.274 75.6539 229.057 73.85C227.141 72.7164 225.457 71.2306 224.094 69.471L224.294 76.299L212.249 77.566L204.237 1.337ZM232.393 37.444C230.299 37.635 228.312 38.4553 226.693 39.797C225.055 41.1714 223.828 42.9706 223.146 44.997C222.384 47.2723 222.139 49.689 222.429 52.071L222.443 52.205C222.66 54.6089 223.404 56.9356 224.621 59.02C225.693 60.8707 227.251 62.3924 229.127 63.42C230.969 64.4016 233.069 64.793 235.141 64.541C237.312 64.355 239.379 63.5272 241.078 62.163C242.757 60.7731 244.031 58.9559 244.764 56.903C245.591 54.5989 245.865 52.1325 245.564 49.703C245.356 47.2703 244.594 44.9174 243.337 42.824C242.229 40.9689 240.618 39.4656 238.691 38.488C237.168 37.7363 235.489 37.3533 233.791 37.37C233.324 37.3703 232.857 37.395 232.393 37.444Z"
					/>
				</g>
				<g id="letter_6">
					<path
						id="s"
						d="M275.83 78.278C273.066 78.0525 270.37 77.3011 267.888 76.064C265.435 74.8263 263.288 73.0586 261.603 70.889L271.01 63.35C272.394 64.608 274.027 65.5618 275.803 66.15C277.753 66.8118 279.855 66.8789 281.843 66.343C283.473 66.0173 285.008 65.3271 286.334 64.324C286.78 64.0092 287.122 63.5677 287.315 63.0567C287.508 62.5456 287.544 61.9884 287.417 61.457C287.321 60.9486 287.084 60.4774 286.733 60.0969C286.382 59.7165 285.932 59.4421 285.433 59.305C284.141 58.9679 282.808 58.8127 281.473 58.844L276.865 58.799C272.607 58.904 268.399 57.8645 264.68 55.789C263.164 54.9439 261.837 53.7975 260.781 52.4205C259.725 51.0435 258.962 49.465 258.538 47.782C257.338 42.9553 257.975 38.835 260.45 35.421C262.925 32.007 267.016 29.5883 272.725 28.165C275.516 27.4438 278.408 27.1957 281.281 27.431C283.869 27.6293 286.396 28.3208 288.725 29.468C290.814 30.4754 292.585 32.0377 293.846 33.984L284.769 41.241C284.305 40.6209 283.713 40.1069 283.035 39.7336C282.356 39.3602 281.605 39.136 280.833 39.076C279.057 38.7737 277.237 38.8367 275.486 39.261C274.118 39.5168 272.871 40.2137 271.936 41.245C271.577 41.6784 271.329 42.193 271.213 42.744C271.098 43.2951 271.119 43.866 271.275 44.407C271.397 44.8283 271.631 45.2085 271.952 45.5067C272.274 45.8048 272.671 46.0096 273.1 46.099C274.406 46.4491 275.757 46.6005 277.108 46.548L283.595 46.529C286.474 46.433 289.334 47.0406 291.925 48.299C294.073 49.3689 295.946 50.9185 297.399 52.828C298.684 54.5111 299.622 56.4331 300.157 58.482C300.871 61.1751 300.65 64.0309 299.53 66.582C298.318 69.2692 296.415 71.587 294.015 73.299C291.2 75.3202 288.011 76.7605 284.633 77.536C282.467 78.0864 280.241 78.3692 278.006 78.378C277.276 78.3753 276.551 78.342 275.83 78.278Z"
					/>
				</g>
				{#if timeRemaining === initialTimeToReset}
					<g id="letter_7">
						<path id="arrow" d="M309.009 45.9339L335.209 19.7339V72.1419L309.009 45.9339Z" />
					</g>
				{/if}
			</g>
		</svg>
	</div>
	{#if initialTimeToReset < 0}
		<div class="reset-timer">
			{timeRemaining / 1000}
		</div>
	{/if}
</div>

<style lang="scss">
	:global(body) {
		transition: transform ease-in-out 0.6s, filter ease-in-out 0.4s;
	}
	:global(body.flip) {
		transform: rotateY(180deg);
	}
	:global(body.ALLSYSTEMSFULLPOWER) {
		background: black;
		:global(.layout) {
			filter: brightness(0);
			pointer-events: none;
		}
	}

	@keyframes rainbow {
		from {
			-webkit-filter: hue-rotate(10deg);
			filter: hue-rotate(10deg);
			// transform: translateY(-5px);
		}
		to {
			-webkit-filter: hue-rotate(360deg);
			filter: hue-rotate(360deg);
			// transform: translateY(0px);
		}
	}
	@keyframes bouncy-letters {
		0% {
			transform: translateY(-3px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	.filter-wrapper {
		position: fixed;
		inset: 0;
		pointer-events: none;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		z-index: 999;
	}

	.filter-box {
		display: block;
		border-radius: 50%;
		height: 1px;
		width: 1px;
		position: absolute;
		transition: transform 0.35s ease-out;
		transform: scale(1);

		&.monochrome {
			backdrop-filter: grayscale(1);
		}
		&.darkmodelol {
			backdrop-filter: invert(1);
		}

		&.expand {
			transform: scale(3000);
			transition: transform 0.5s ease-in;
		}
	}

	.wordmark-wrapper {
		display: flex;
	}

	.wordmark {
		height: 5.5rem;
		width: 100%;
		display: grid;

		.eg-hint {
			filter: brightness(1.3);
			transform: translateY(-1px);
			// fill: red;
		}

		&.easter-egg .front g {
			path {
				animation: bouncy-letters 0.75s infinite calc(150ms * var(--index)) alternate;
			}
			animation: rainbow 1.75s steps(36) infinite;
		}

		svg {
			overflow: visible;
			grid-column-start: 1;
			grid-row-start: 1;
			height: 5rem;
			max-width: 100%;
			stroke-width: 0px;

			#letter_5.fall {
				transition: transform ease-in 0.5s;
				transform: translateY(12rem);
			}

			&.front {
				z-index: 2;
			}

			#wordmark > g {
				transition: transform ease-in 150ms, stroke-width ease-in 150ms;
				&:hover:not(.fall) {
					stroke: var(--color-on-background);
					stroke-width: 2px;
					transform: translateY(-2px);
				}
				&:active:not(.fall) {
					transform: translateY(0px);
					stroke: var(--color-on-background);
					stroke-width: 2px;
				}
			}
		}
	}

	// .reset-timer {
	// 	user-select: all;
	// 	border: 5px solid lime;
	// 	outline: 1px solid var(--color-on-background);
	// 	height: 4rem;
	// 	width: 4rem;
	// 	display: grid;
	// 	place-items: center;
	// 	font-weight: 900;
	// 	font-size: 2rem;
	// 	border-radius: 5rem;
	// }
	@media (prefers-reduced-motion: reduce) {
		.wordmark.easter-egg svg g {
			path {
				animation: none;
			}
			animation: rainbow 3s steps(36) infinite;
		}

		:global(body) {
			transition: none !important;
		}
	}
</style>
