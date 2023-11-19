<script lang="ts">
	import type { Social } from '$lib/data/socials';
	import IconChevronRight from '@tabler/icons-svelte/dist/svelte/icons/IconChevronRight.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';

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
						{#if social.username || social.activity || social.description}
							<span class="subtext">
								{#if social.description}
									{social.description}
								{/if}
								{#if social.username}
									{social.username}
								{/if}
								{#if social.activity && social.username}
									•
								{/if}
								{#if social.activity}
									<span class="activity {social.activity}">
										{#if social.activity === 'low'}
											Not very active
										{:else if social.activity === 'medium'}
											Moderately active
										{:else if social.activity === 'high'}
											Very active
										{/if}
									</span>
								{/if}
							</span>
						{/if}
					</div>
				</div>

				<div class="icon-link">
					{#if social.url.startsWith('/')}
						<IconChevronRight />
					{:else}
						<IconExternalLink />
					{/if}
				</div>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
		list-style: none;
		width: 100%;

		li {
			margin: 0;
			width: 100%;

			&:first-child a {
				border-radius: 1rem 1rem 0 0;
				border-top: 1px solid var(--color-outline);
			}

			&:last-child a {
				border-radius: 0 0 1rem 1rem;
			}

			&:first-child:last-child a {
				border-radius: 1rem;
			}

			a {
				padding: 1rem;
				display: flex;
				gap: 1rem;
				text-decoration: none;
				border: 1px solid var(--color-outline);
				border-top: none;
				align-items: center;
				justify-content: space-between;
				background-color: var(--color-background);

				:global(svg #arrow) {
					transition: all 100ms ease-in-out;
				}

				:global(svg) {
					transition: all 100ms ease-in-out;
				}

				.social {
					display: flex;
					align-items: center;
					gap: 0.75rem;

					:global(svg) {
						width: 24px;
						height: 24px;
					}

					&-name {
						display: flex;
						flex-direction: column;
						flex: 1;

						.activity {
							font-weight: 500;

							&.medium {
								color: #b67014;
							}
							&.high {
								color: var(--color-error);
							}
						}
					}
				}

				&:hover,
				&:focus {
					background-color: var(--color-surface);

					:global(svg #arrow) {
						transform: translate(2px, -2px);
					}

					:global(.tabler-icon-chevron-right) {
						transform: translateX(3px);
					}
				}

				&:active {
					:global(svg #arrow) {
						transform: translate(-1px, 1px);
					}

					:global(.tabler-icon-chevron-right) {
						transform: translateX(-2px);
					}
				}
			}
		}
	}

	@media (max-width: 600px) {
		.icon-link {
			display: none;
		}
	}
</style>
