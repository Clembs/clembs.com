<script lang="ts">
	import type { BrandingPost } from '$lib/data/branding';
	import { technologies } from '$lib/data/technologies';
	import IconChevronRight from '@tabler/icons-svelte/dist/svelte/icons/IconChevronRight.svelte';

	let opened = false;

	export let data: BrandingPost;
</script>

<aside class="info-card">
	<div class="info-card-content">
		<div class="button-more">
			<button class:opened on:click={() => (opened = !opened)}>
				{opened ? 'Minimize' : 'More info'}
				<IconChevronRight />
			</button>
		</div>
		<div class="sections" class:opened>
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
						year: 'numeric',
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
		<div class="links">
			{#if data.links?.assetsUrl}
				<a href={data.links.assetsUrl}>Download assets <IconChevronRight /> </a>
			{/if}
			{#if data.links?.repoUrl}
				<a href={data.links.repoUrl}>
					GitHub repository <IconChevronRight />
				</a>
			{/if}
			{#if data.links?.projectUrl}
				<a href={data.links.projectUrl}>
					Check it out <IconChevronRight />
				</a>
			{/if}
		</div>
	</div>
</aside>

<style lang="scss">
	.info-card {
		border-left: 1px solid black;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 320px;
		z-index: 2;

		.info-card-content {
			display: flex;
			flex-direction: column;
			position: sticky;
			inset: 0;
			border-bottom: 1px solid black;
			background-color: white;

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

		.button-more {
			display: none;
		}

		.links a,
		button {
			width: 100%;
			appearance: none;
			font-style: inherit;
			font-family: inherit;
			font-size: inherit;
			cursor: pointer;
			border: none;
			background-color: white;
			color: black;
			padding: 0.5rem 1rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid black;

			&:hover {
				text-decoration: none;
				background-color: #e7e7e7;
				&:global(:not(button) svg) {
					transform: translateX(4px);
				}
			}
			:global(svg) {
				transition: transform cubic-bezier(0.5, 0, 0.25, 1.75) 200ms;
			}
		}
	}

	@media (max-width: 850px) {
		.info-card {
			border-left: none;
			max-width: 100%;
			margin: 0.7rem 0.7rem 0 0.7rem;
			border-radius: 1rem;

			.info-card-content {
				border-radius: 1rem;
				border: 1px solid black;
				overflow: hidden;

				.sections {
					padding: 0 1rem;
					max-height: 0;
					transition: padding 500ms cubic-bezier(0.5, 0, 0.25, 1.75),
						max-height 400ms cubic-bezier(0.5, 0, 0, 1.1);

					&.opened {
						padding: 1rem;
						max-height: 30rem;
					}
				}

				.button-more {
					display: block;
					button {
						border: 1px solid transparent;
						&.opened {
							border-bottom: 1px solid black;
						}
					}

					:global(button.opened svg) {
						transform: rotate(-90deg);
					}
				}
			}
		}
	}
</style>
