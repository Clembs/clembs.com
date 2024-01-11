<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import { streamSocials } from '$lib/data/socials';
	import type { Stream, User } from '$lib/db/types';
	import { dateFormat } from '$lib/helpers/dateFormat';

	export let stream: Stream;
	export let userData: User | null | undefined;
</script>

<div class="stream">
	<div class="stream-info">
		{#each streamSocials as social}
			<span
				class="social"
				class:active={stream.platforms.find((platform) => platform.id === social.id)}
			>
				<svelte:component this={social.icon} />
			</span>
		{/each}
		<div class="stream-info-text">
			<b>{stream.title}</b>
			<div class="subtext">
				<time datetime={stream.startedAt.toDateString()}>{dateFormat(stream.startedAt)}</time>
				{#if stream.state === 'CANCELLED'}
					<span class="cancelled"> • Cancelled </span>
				{/if}
			</div>
		</div>
	</div>

	{#if userData?.badges?.includes('CLEMBS') && stream.state !== 'ENDED' && stream.startedAt.getTime() > Date.now()}
		<form method="POST" use:enhance action="/stream/edit?/updateStreamState">
			<input type="hidden" name="streamId" value={stream.id} />
			<input
				type="hidden"
				name="newState"
				value={stream.state === 'DEFAULT' ? 'CANCELED' : 'DEFAULT'}
			/>
			<Button style={stream.state === 'DEFAULT' ? 'danger' : 'filled'} type="submit">
				{#if stream.state === 'DEFAULT'}
					Cancel stream
				{:else}
					Reopen stream
				{/if}
			</Button>
		</form>
	{/if}
</div>

<style lang="scss">
	.stream {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: space-between;
		padding: 1rem;
		border-radius: 1rem;
		width: 100%;
		border: 1px solid var(--color-outline);
		background-color: var(--color-background);

		&:nth-child(even) {
			background-color: var(--color-surface);
		}

		.stream-info {
			display: flex;
			align-items: center;
			gap: 0.75rem;

			b {
				font-weight: 500;
			}

			.cancelled {
				color: var(--color-error);
				font-weight: 500;
			}

			.social {
				display: grid;
				opacity: 0.25;

				:global(svg) {
					height: 1.5rem;
					width: 1.5rem;
				}

				&.active {
					opacity: 1;
				}
			}
		}
	}
</style>
