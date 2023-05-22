<script lang="ts">
	import type { BrandingPost } from '$lib/data/branding';
	import { technologies } from '$lib/data/technologies';

	let minimized = false;
	let manuallyMinimized: boolean | null = null;

	export let data: BrandingPost;
</script>

<svelte:window
	on:scroll={() => {
		minimized = (document.scrollingElement?.scrollTop || 0) > 200;
	}}
/>

<aside
	class="info-card"
	class:minimized={manuallyMinimized === null ? minimized : manuallyMinimized}
>
	<div class="info-card-content">
		<div class="sections">
			<section id="about">
				<div class="section-title">About</div>
				<span>{data.brief.split(' ').slice(0, 20).join(' ')}...</span>
			</section>
			<section id="date">
				<div class="section-title">Created at</div>
				<time datetime={data.finishedAt.toDateString()}>
					{data.finishedAt.toLocaleString('en-US', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}
				</time>
				• made in {(data.finishedAt.getTime() - data.createdAt.getTime()) / 86_400_000} days
			</section>
			<section id="technologies">
				<div class="section-title">Technologies</div>
				<div class="technologies">
					{#each data.technologies.map((t) => technologies[t]) as technology}
						<img
							title={technology.name}
							draggable="false"
							src={technology.iconUrl}
							alt={technology.name}
						/>
					{/each}
				</div>
			</section>
		</div>
		{#if data.links}
			<div class="links">
				{#if data.links?.assetsUrl}
					<span class="divider" />
					<a href={data.links.assetsUrl}>Download assets</a>
				{/if}
				{#if data.links?.repoUrl}
					<span class="divider" />
					<a href={data.links.repoUrl}>GitHub repository</a>
				{/if}
				{#if data.links?.projectUrl}
					<span class="divider" />
					<a href={data.links.projectUrl}>Check it out</a>
				{/if}
				<span class="divider" />
			</div>
		{/if}
	</div>
</aside>

<style lang="scss">
	.info-card {
		border-left: 1px solid black;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 320px;

		.info-card-content {
			display: flex;
			flex-direction: column;
			position: sticky;
			top: 0;
			left: 0;

			.sections {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				padding: 1rem;

				section {
					.section-title {
						font-weight: 600;
						font-size: 0.9rem;
						padding-bottom: 0.3rem;
						user-select: none;
					}
					.technologies {
						display: flex;
						gap: 0.3rem;
						user-select: none;

						img {
							width: 32px;
							height: auto;
						}
					}
				}
			}
		}

		.divider {
			height: 1px;
			background-color: black;
			width: 100%;
			display: block;
		}

		.links a {
			width: 100%;
			display: block;
			color: black;
			padding: 0.5rem 1rem;
			display: flex;
			justify-content: space-between;

			&:hover {
				text-decoration: none;
				background-color: #e7e7e7;
				&::after {
					transition: transform ease-out 100ms;
					transform: translate(5px, -1px);
				}
			}
			&::after {
				transition: transform ease-in 100ms;
				content: 'ᐳ';
			}
		}
	}
</style>
