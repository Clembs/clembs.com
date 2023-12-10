<script lang="ts">
	import { softwareData, softwarePlatforms } from '$lib/data/software';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { LayoutServerData } from './$types';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import Comments from '../comments/Comments.svelte';
	import IconExternalLink from '$lib/icons/IconExternalLink.svelte';
	import '../../styles/showcase.scss';

	let expandOtherDownloads = false;

	export let data: LayoutServerData;
</script>

<MetaTags
	pageName={data.name}
	description="{data.brief} •
	{data.createdAt.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})}"
/>

<header>
	<div class="about">
		<img src={data.iconPath} height={58} width={58} alt={data.name} />

		<div class="text">
			<h1 class="title">{data.name}</h1>

			<span class="subtext">
				<time datetime={data.createdAt.toDateString()}>
					{data.createdAt.toLocaleString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
				</time>
			</span>
		</div>
	</div>

	<div class="buttons">
		{#if (data.links?.downloadUrl || data.links?.downloadUrls) && data.platforms}
			<Button href={data.links.downloadUrl || data.links?.downloadUrls?.[0]?.url}>
				Download for {softwarePlatforms[
					data.links?.downloadUrls?.[0]?.platform || data.platforms[0]
				]}
			</Button>
		{/if}
		{#if data.links?.versionHistory || data.links?.downloadUrls}
			<Button style="outlined" on:click={() => (expandOtherDownloads = !expandOtherDownloads)}>
				Other downloads
			</Button>
		{/if}
		{#if data.links?.projectUrl}
			<Button href={data.links?.projectUrl} aria-label="Check it out">
				Check it out
				<IconExternalLink />
			</Button>
		{/if}
		<Button style="outlined" href="#comments" aria-label="Comments">
			<IconMessageCircle />
		</Button>
		<ShareButton url={$page.url.href} />
	</div>

	<!-- {#if expandOtherDownloads}
			<div class="other-downloads" transition:slide>
				{#if data.links?.versionHistory}
					<h3>Other versions</h3>
					<ul>
						{#each data.links.versionHistory as version}
							<li>
								<Button style="text" href={version.url}>
									<span>
										{version.label} •
										<time datetime={version.createdAt.toDateString()}>
											{version.createdAt.toLocaleString('en-US', {
												month: 'long',
												day: 'numeric',
												year: 'numeric',
											})}
										</time>
									</span>
								</Button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if} -->
</header>

<article>
	<slot />
</article>

<!-- <section id="suggested-apps">
	<h2>Other apps by Clembs</h2>

	<SoftwareGrid
		projects={softwareData
			.filter(({ id }) => id !== data.id)
			.sort(Math.random)
			.slice(0, 4)}
	/>
</section> -->

<Comments projectId="{data.type}/{data.id}" comments={data.comments} userData={data.userData} />

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin: 1rem;
		margin-bottom: 2rem;

		.about {
			display: flex;
			align-items: center;
			gap: 1rem;

			img {
				border-radius: 1rem;
				border: 1px solid var(--color-outline);
				box-shadow: 0 2px 0 0 var(--color-outline);
			}
		}

		.other-downloads {
			margin-top: 1rem;

			ul {
				list-style-type: none;
				padding: 0;
				margin: 1rem 0 0 -1rem;

				li {
					margin: 0;

					time {
						font-size: 0.9rem;
						color: var(--color-on-surface);
					}
				}
			}
		}

		.title {
			font-size: clamp(1.5rem, 5vw, 2rem);
			margin: 0;
		}

		.buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem;
			align-items: center;
		}
	}

	section {
		padding: 1rem;
	}

	#gallery {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.gallery-images {
			display: flex;
			gap: 0.5rem;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			scroll-behavior: smooth;
			-webkit-overflow-scrolling: touch;
			align-items: center;
			scrollbar-width: none;

			img {
				width: 100%;
				scroll-snap-align: start;
				flex-shrink: 0;
			}
		}

		.pagination {
			display: flex;
			justify-content: center;
			gap: 0.1rem;

			.go-to-button {
				appearance: none;
				border: none;
				background-color: transparent;
				display: grid;
				place-items: center;
				height: 1.25rem;
				width: 1.25rem;
				border-radius: 0.25rem;

				&:hover {
					background-color: var(--color-surface);
					box-shadow: none;

					.dot {
						transform: scale(1.3);
					}
				}
				&:active,
				&:focus-within {
					box-shadow: none;
					.dot {
						transform: scale(0.9);
					}
				}

				.dot {
					height: 0.5rem;
					width: 0.5rem;
					border-radius: 999rem;
					background-color: var(--color-on-surface);
					transition: transform ease-in-out 100ms;

					&.selected {
						background-color: var(--color-on-background);
						transform: scale(1.5);
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		header {
			flex-direction: column;
			text-align: center;
			gap: 1rem;

			.about {
				flex-direction: column;
				gap: 0.5rem;
			}

			.buttons {
				justify-content: center;
			}
		}
	}
</style>
