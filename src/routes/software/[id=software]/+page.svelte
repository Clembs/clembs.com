<script lang="ts">
	import '../../../styles/showcase.scss';
	import type { Software } from '$lib/data/software';
	import InfoCard from '../../branding/InfoCard.svelte';

	export let data: Software;
</script>

<header>
	<div class="icon">
		<img src={data.iconPath} alt="{data.name} icon" draggable="false" />
	</div>

	<div class="text">
		<h1 class="title">{data.name}</h1>

		<span class="category">{data.category}</span>
	</div>
</header>

<main>
	<InfoCard {data} />

	<div class="content">
		<h2>About</h2>

		{@html data.description}

		{#if data.gallery}
			<h2>Gallery</h2>

			<div class="gallery">
				{#each data.gallery as image, i}
					<img id="image-{i}" class="stylized-element" src={image} alt="Screenshot {i}" />
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
						<span class="dot" />
					</button>
				{/each}
			</div>
		{/if}

	</div>
</main>

<style lang="scss">
	header {
		border-radius: 1rem 1rem 0 0;
		border-bottom: 1px solid var(--color-on-background);
		padding: 1.4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
    text-align: center;

		.icon img {
			border: 1px solid black;
			height: 6rem;
			width: 6rem;
			border-radius: 1.5rem;
		}

    .title {
			font-size: 2rem;
			margin: 0;
		}
	}

	.content {
		margin: 1.5rem;
		margin-top: 1rem;
	}

	main {
		display: flex;
		flex-direction: row-reverse;
		height: 100%;
	}

	.gallery {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		border-radius: 1rem;
		align-items: center;

		img {
			width: 100%;
			scroll-snap-align: start;
			flex-shrink: 0;
		}
	}

	.pagination {
		display: flex;
		justify-content: center;
		width: 100%;

		.go-to-button {
			appearance: none;
			border: none;
			background-color: transparent;
			display: grid;
			place-items: center;
			padding: 0.5rem;
			border-radius: 0.25rem;
		}
	}

	@media (max-width: 850px) {
		main {
			flex-direction: column;
			align-items: center;
			margin: 0 1rem 1rem 1rem;
		}

		.content {
			margin: 0rem;
			margin-top: 1rem;
		}

		.title {
			font-size: 2rem;
		}
	}
</style>
