<script lang="ts">
	import { softwareData, softwarePlatforms } from '$lib/data/software';
	import Button from '$lib/components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { PageServerData } from './$types';
	import SoftwareGrid from '$lib/components/Projects/SoftwareGrid.svelte';
	import { slide } from 'svelte/transition';
	import IconMessageCircle from '@tabler/icons-svelte/dist/svelte/icons/IconMessageCircle.svelte';
	import Comments from '../../comments/Comments.svelte';

	let observer: IntersectionObserver;
	let viewedImage = 0;
	let expandOtherDownloads = false;

	onMount(() => {
		if (!data.gallery) return;
		const galleryImages = document.querySelectorAll('.gallery-image');

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					viewedImage = Number(entry.target.id.replace('image-', ''));
				}
			});
		});

		galleryImages.forEach((image) => observer.observe(image));
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
	});

	export let data: PageServerData;
</script>

<svelte:head>
	<style src="../../../styles/showcase.scss"></style>
</svelte:head>

<MetaTags
	pageName={data.name}
	description="{data.category} •
	{data.createdAt.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})}"
/>

<header>
	<div class="icon">
		<img src={data.iconPath} alt="{data.name} icon" draggable="false" />
	</div>

	<div class="about-and-buttons">
		<div class="about">
			<h1 class="title">{data.name}</h1>

			<span class="subtext">
				<time datetime={data.createdAt.toDateString()}>
					{data.createdAt.toLocaleString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric',
					})}
				</time>
				• {data.category}
			</span>
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
				<Button href={data.links?.projectUrl}>Check it out</Button>
			{/if}
			<Button style="outlined" href="#comments">
				<!-- on:click={() => document.querySelector('.comments-page')?.scrollIntoView()} -->
				<IconMessageCircle />
				Comments ({data.comments.length})
			</Button>
			{#if data.links?.repoUrl}
				<Button style={data.links?.projectUrl ? 'outlined' : 'filled'} href={data.links?.repoUrl}>
					View source
				</Button>
			{/if}
			<ShareButton url={$page.url.href} />
		</div>

		{#if expandOtherDownloads}
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
		{/if}
	</div>
</header>

<article>
	<h2>Overview</h2>

	<p>
		{@html data.description}
	</p>
</article>

{#if data.gallery}
	<section id="gallery">
		<h2>Gallery</h2>

		<div class="gallery-images">
			{#each data.gallery as image, i}
				<img
					id="image-{i}"
					class="gallery-image stylized-element"
					src={image}
					alt="Image {i + 1}/{data.gallery.length}"
				/>
			{/each}
		</div>

		<div class="pagination">
			{#each data.gallery as image, i}
				<button
					class="go-to-button"
					on:click={() =>
						document
							.querySelector(`#image-${i}`)
							?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })}
				>
					<span class="dot {viewedImage === i ? 'selected' : ''}" />
				</button>
			{/each}
		</div>
	</section>
{/if}

<section id="suggested-apps">
	<h2>Other apps by Clembs</h2>

	<SoftwareGrid
		projects={softwareData
			.filter(({ id }) => id !== data.id)
			.sort(Math.random)
			.slice(0, 4)}
	/>
</section>

<Comments projectId="{data.type}/{data.id}" comments={data.comments} userData={data.userData} />

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		padding: 2rem 1rem;
		display: flex;
		gap: 2rem;

		.icon img {
			border: 1px solid var(--color-outline);
			width: clamp(5rem, 8rem, 10rem);
			height: auto;
			border-radius: 2.5rem;
			box-shadow: 0 2px 0 0 var(--color-on-background);
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

		.about-and-buttons {
			.about {
				display: flex;
				flex-direction: column;
				margin-bottom: 1rem;
				gap: 0.25rem;

				.title {
					font-size: clamp(1.5rem, 5vw, 2rem);
					margin: 0;
				}
			}
			.buttons {
				display: flex;
				flex-wrap: wrap;
				gap: 0.5rem;
				align-items: center;
			}
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

			.icon {
				align-self: center;
			}

			.buttons {
				justify-content: center;
			}
		}
	}
</style>
