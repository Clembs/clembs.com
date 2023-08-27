<script lang="ts">
	// import '../../../styles/showcase.scss';
	import { softwareData } from '$lib/data/software';
	import Button from '$lib/components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Comments from '../../comments/Comments.svelte';
	import type { PageServerData } from './$types';
	import SoftwareGrid from '$lib/components/Projects/SoftwareGrid.svelte';

	let observer: IntersectionObserver;
	let viewedImage = 0;

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

			<span class="subtext">{data.category}</span>
		</div>

		<div class="buttons">
			{#if data.links?.projectUrl}
				<Button href={data.links?.projectUrl}>Check it out</Button>
			{/if}
			{#if data.links?.repoUrl}
				<Button style={data.links?.projectUrl ? 'outlined' : 'filled'} href={data.links?.repoUrl}>
					View source
				</Button>
			{/if}
			<!-- <Button style="outlined" href="#comments">
				<IconMessageCircle />
				Comments
			</Button> -->
			<ShareButton url={$page.url.href} />
		</div>
	</div>
</header>

<article>
	<h2>Overview</h2>

	<p>
		{@html data.description}
	</p>

	{#if data.gallery}
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
	{/if}
</article>
<div class="suggested-apps">
	<h3>Other apps by Clembs</h3>

	<SoftwareGrid projects={softwareData.filter(({ id }) => id !== data.id).slice(0, 3)} />
</div>
<!-- <time datetime={data.createdAt.toDateString()}>
	{data.createdAt.toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})}
</time> -->

<Comments projectId="{data.type}/{data.id}" comments={data.comments} userData={data.userData} />

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		border-bottom: 1px solid var(--color-on-surface);
		padding: 1rem 1rem 2rem 1rem;
		display: flex;
		gap: 2rem;
		align-items: center;

		.icon img {
			border: 1px solid var(--color-outline);
			width: clamp(5rem, 8rem, 10rem);
			height: auto;
			border-radius: 2.5rem;
			box-shadow: 0 2px 0 0 var(--color-on-background);
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

				.subtext {
					font-size: 0.9rem;
					color: var(--color-on-surface);
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

	.suggested-apps {
		border-top: 1px solid var(--color-on-background);
		padding: 0.5rem 1rem;
	}

	@media (max-width: 768px) {
		header {
			flex-direction: column;
			text-align: center;
			gap: 1rem;

			.buttons {
				justify-content: center;
			}
		}

		.suggested-apps {
			padding: 0.25rem 1rem;
		}
	}
</style>
