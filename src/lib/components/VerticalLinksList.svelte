<script lang="ts">
	import type { Social } from '$lib/data/socials';
	export let socials: Social[];
</script>

<ul class="links">
	{#each socials as social}
		<li>
			<a
				href={social.url}
				rel="me noopener noreferrer"
				target={social.url.startsWith('/') ? '_self' : '_blank'}
			>
				<div class="social">
					<svelte:component this={social.icon} />

					<div class="social-name">
						<span>{social.name}</span>
					</div>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		padding: 0;
		margin: 0;
		list-style: none;
		width: 100%;

		li {
			margin: 0;
			width: 100%;

			&:first-child a {
				border-radius: 1rem 0 0 1rem;
			}

			&:last-child a {
				border-radius: 0 1rem 1rem 0;
				border-right: 1px solid var(--color-outline);
			}

			&:first-child:last-child a {
				border-radius: 1rem;
			}

			a {
				padding: 1rem 0.25rem;
				display: flex;
				gap: 1rem;
				text-decoration: none;
				border: 1px solid var(--color-outline);
				border-right: none;
				align-items: center;
				justify-content: center;
				background-color: var(--color-background);
				height: 100%;
				text-align: center;

				.social {
					display: flex;
					align-items: center;
					gap: 0.75rem;
					flex-direction: column;

					:global(svg) {
						width: 20px;
						height: 20px;
					}

					&-name {
						display: flex;
						flex-direction: column;
						flex: 1;
						font-size: 0.9rem;

						@media (max-width: 375px) {
							display: none;
						}
					}
				}

				&:hover,
				&:focus {
					background-color: var(--color-surface);
				}
			}
		}
	}
</style>
