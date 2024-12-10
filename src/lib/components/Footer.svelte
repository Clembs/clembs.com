<script lang="ts">
	import { footerSocials } from '$lib/data/socials';
	import Clembs from '$lib/icons/Clembs.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';
	import {
		IconArticle,
		IconChevronRight,
		IconGitFork,
		IconPencil,
		IconUser,
	} from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	let footerEl: HTMLElement;
	let scaleFactor = 1;
	let brightness = 1;

	// progressively animate the footer as the user scrolls closer to the page bottom (viewport height - 250px to viewport height)
	// brightness should be raised from 0.75 to 1
	// scale should be raised from 0.9 to 1
	function scroll() {
		// if the "cards" view isn't active, don't bother
		if (matchMedia('(max-width: 750px)').matches) return;

		const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrollProgress = Math.max(0, Math.min(1, (window.scrollY - (scrollHeight - 250)) / 250));

		scaleFactor = 0.9 + scrollProgress * 0.1;
		brightness = 0.75 + scrollProgress * 0.25;
	}

	// if the user focuses on something within the footer, scroll to the bottom of the page
	function focus() {
		window.scrollBy({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	}

	onMount(() => {
		scroll();

		// check all focusable elements
		footerEl.querySelectorAll('a, button').forEach((el) => {
			el.addEventListener('focus', focus);
		});
	});
</script>

<!-- when the focus is changed too -->
<svelte:window on:scroll={scroll} on:resize={scroll} />

<footer bind:this={footerEl} style:scale={scaleFactor} style:filter="brightness({brightness})">
	<div class="left">
		<div class="credits">
			<Clembs />
			<p>
				Clembs &copy; {new Date().getFullYear()}
			</p>
			<p>All rights reserved.</p>
		</div>

		<a
			href="https://github.com/Clembs/clembs.com"
			target="_blank"
			rel="noopener noreferrer"
			class="footer-link"
		>
			<div class="label">
				<IconGitFork />
				Source
			</div>

			<IconExternalLink />
		</a>
	</div>

	<div class="right">
		<ul role="navigation" aria-label="shortcuts" id="shortcuts">
			<li>
				<a href="/contact" class="footer-link">
					<div class="label">
						<IconUser />
						Contact
					</div>

					<IconChevronRight />
				</a>
			</li>
			<li>
				<a href="/blog" class="footer-link">
					<div class="label">
						<IconPencil />
						Blog
					</div>

					<IconChevronRight />
				</a>
			</li>
			<li>
				<a
					href="https://c.clembs.com/files/389533db63ad437adb.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-link"
				>
					<div class="label">
						<IconArticle />
						CV (Français)
					</div>
					<IconExternalLink />
				</a>
			</li>
		</ul>

		<ul role="navigation" aria-label="socials" id="socials">
			{#each footerSocials as social}
				<li>
					<a href={social.url} aria-label={social.name}>
						<svelte:component this={social.icon} />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>

<style lang="scss">
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 3rem;
		padding: 1rem;
		width: 100%;

		// peeping card view
		position: sticky;
		inset: 0;
		bottom: 1rem;
		z-index: 1;
		max-width: 750px;
		margin: 1rem auto;
		background-color: var(--color-background);
		border: 1px solid var(--color-outline);
		border-radius: 1.5rem;

		// cancel peeping card view on smaller screens (rip)
		@media (max-width: 750px) {
			position: initial;
			margin: 0;
			background-color: transparent;
			border: none;
			border-top: 1px solid var(--color-outline);
			border-radius: 0;
			scale: 1 !important;
			filter: brightness(1) !important;
		}

		@media (max-width: 500px) {
			flex-direction: column;
			gap: 1rem;
		}

		.footer-link {
			display: flex;
			align-items: center;
			justify-content: space-between;
			align-items: center;
			gap: 0.5rem;
			font-size: 1rem;
			font-weight: 500;
			color: var(--color-on-background);
			text-decoration: none;
			padding: 0.5rem;
			margin: -0.5rem;
			border-radius: 1rem;
			min-width: 200px;

			@media (max-width: 500px) {
				min-width: 0;
			}

			.label {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}

			:global(svg) {
				width: 20px;
				height: 20px;
			}

			&:hover {
				background-color: var(--color-surface);
				transition: background-color 100ms;
			}
		}

		.left {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			@media (max-width: 500px) {
				width: 100%;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 0.5rem 0;

			@media (max-width: 500px) {
				padding: 0;
				width: 100%;
			}

			#shortcuts {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				list-style: none;
				padding: 0;
				margin: 0;

				li {
					padding: 0;
					margin: 0;
				}
			}

			#socials {
				display: flex;
				width: 100%;
				justify-content: space-between;
				gap: 1rem;
				list-style: none;
				padding: 0;
				margin: 0;
				align-self: flex-end;

				@media (max-width: 500px) {
					align-self: center;
					justify-content: center;
					gap: 2rem;
				}

				li {
					padding: 0;
					margin: 0;
				}

				a {
					display: flex;
					align-items: center;
					padding: 0.75rem;
					margin: -0.75rem;
					border-radius: 50%;

					&:hover {
						background-color: var(--color-surface);
						transition: background-color 100ms;
					}
				}

				:global(svg) {
					width: 18px;
					height: 18px;
				}
			}
		}
	}
</style>
