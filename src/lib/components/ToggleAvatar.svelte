<script lang="ts">
	let currentFace: 'logo' | 'irl' = 'irl';
	let isAnimating = false;
</script>

<button
	class="avatar"
	disabled={isAnimating}
	on:click={() => {
		if (isAnimating) return;
		isAnimating = true;
		setTimeout(() => (isAnimating = false), 500);
		currentFace = currentFace === 'irl' ? 'logo' : 'irl';
	}}
>
	<!-- irl -->

	<div
		class="img-wrapper"
		class:animating={isAnimating}
		aria-hidden={currentFace !== 'irl'}
		id="irl"
	>
		<img
			src="/assets/clément-herrenchimsee-2023.webp"
			alt="Portrait of Clément smiling"
			draggable="false"
		/>
	</div>
	<!-- logo -->

	<div
		class="img-wrapper"
		class:animating={isAnimating}
		aria-hidden={currentFace !== 'logo'}
		id="logo"
	>
		<img src="/assets/logo-purplue.webp" alt="Clembs logo" draggable="false" />
	</div>
</button>

<style lang="scss">
	@media (prefers-reduced-motion) {
		.img-wrapper {
			animation: none !important;
		}
	}

	.avatar {
		--_size: clamp(6rem, 12vw, 10rem);
		--_animation-spacing: clamp(30px, 6vw, 45px);

		cursor: pointer;
		appearance: none;
		border: none;
		position: relative;
		background-color: transparent;
		border-radius: 1rem;
		padding: 0;
		margin: 0;
		width: var(--_size);
		height: var(--_size);
		border-radius: 999px;
		box-shadow: none;

		@keyframes switchPfpFront {
			0% {
				z-index: 2;
				transform: translate(0px, 0px) scale(1);
			}
			50% {
				z-index: 0;
				transform: translate(var(--_animation-spacing), var(--_animation-spacing)) scale(0.7);
			}
			100% {
				transform: translate(5px, 5px) scale(1);
			}
		}

		@keyframes switchPfpBack {
			0% {
				z-index: 0;
				transform: translate(5px, 5px) scale(1);
			}
			50% {
				z-index: 2;
				transform: translate(
						calc(0px - var(--_animation-spacing)),
						calc(0px - var(--_animation-spacing))
					)
					scale(0.7);
			}
			100% {
				transform: translate(0px, 0px) scale(1);
			}
		}

		.img-wrapper {
			position: absolute;
			inset: 0;
			z-index: 2;
			transition: transform ease-in-out 100ms;

			&.animating {
				animation: switchPfpBack ease-in-out 500ms;
			}

			img {
				width: var(--_size);
				height: var(--_size);
				object-fit: cover;
				border-radius: 999px;
				border: 1px var(--color-on-background) solid;
				// box-shadow: 3px 3px 0px 0px var(--color-on-background);
			}

			&[aria-hidden='false'] {
				&:hover {
					transform: translate(-1px, -1px);
				}
				&:active {
					transform: translate(-4px, -4px);
				}
			}

			&::after {
				border-radius: 999px;
				content: '';
				background-color: black;
				inset: 0;
				position: absolute;
				opacity: 0;
				transition: opacity 250ms ease-in-out;
			}

			&[aria-hidden='true'] {
				&.animating {
					animation: switchPfpFront ease-in-out 500ms;
				}

				z-index: 0;
				transform: translate(5px, 5px);

				&::after {
					opacity: 1;
				}
			}
		}
	}
</style>
