<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { IconDownload, IconExternalLink } from '@tabler/icons-svelte';

	export let project: Project;
</script>

<div class="project">
	<img
		loading="lazy"
		src={project.iconPath}
		alt="Icon for {project.name}"
		height={64}
		width={64}
		class="icon"
	/>
	<div class="about">
		<div class="name-and-summary">
			<time class="subtext" datetime={project.createdAt.toISOString()}>
				{(project.finishedAt || project.createdAt)?.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
				})}
			</time>
			<h3 class="name">
				{project.name}
			</h3>
			<p class="subtext">{project.brief}</p>
		</div>

		<div class="links">
			<a
				href={project.links.projectUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="cta subtext"
			>
				View project <IconExternalLink size={15} />
			</a>

			{#if project.links.repoUrl}
				<a
					href={project.links.repoUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="cta subtext"
				>
					View repository <IconExternalLink size={15} />
				</a>
			{/if}

			{#if project.links.downloadUrl}
				<a href={project.links.downloadUrl} class="cta subtext">
					Download <IconDownload size={15} />
				</a>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.project {
		display: flex;
		gap: 1rem;

		// temporary for consistency with the previous design
		background-color: var(--color-background);
		padding: 0.75rem;
		border-radius: 1.5rem;
		border: 1px solid var(--color-outline);
		grid-row: span 1;

		.icon {
			border: 1px solid var(--color-on-background);
			border-radius: 0.75rem;
		}

		.about {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			margin-top: -0.5rem;

			time {
				font-size: 0.65rem;
				color: var(--color-on-background);
				text-transform: uppercase;
				font-weight: 500;
			}

			.name {
				font-size: 1.1rem;
				font-weight: 500;
				text-wrap: balance;
				margin-bottom: 0.25rem;
			}
		}

		.links {
			display: flex;
			column-gap: 1.5rem;
			row-gap: 1rem;
			flex-wrap: wrap;

			.cta {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
				text-decoration: none;
				padding: 0.5rem 0.75rem;
				margin: -0.5rem -0.75rem;
				width: max-content;
				border-radius: 0.75rem;

				&:hover {
					background-color: var(--color-surface);
				}
			}
		}
	}
</style>
