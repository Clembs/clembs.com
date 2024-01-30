<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LinksList from '$lib/components/LinksList.svelte';
	import { SocialName, discord, socials, streamSocials } from '$lib/data/socials';
	import { relativeTimeFormat } from '$lib/helpers/dateFormat';
	import HabileHappy from '$lib/svg/HabileHappy.svelte';
	import HabileNeutral from '$lib/svg/HabileNeutral.svelte';
	import { IconHeart } from '@tabler/icons-svelte';
	import type { PageServerData } from './$types';
	import Stream from './Stream.svelte';
	import MetaTags from '$lib/components/MetaTags.svelte';
	import Mention from '../comments/Comment/Mention.svelte';

	export let data: PageServerData;

	const currentStream = data.streams.find(
		(stream) => stream.state === 'DEFAULT' && stream.startedAt.getTime() < Date.now()
	);
	const upcomingStreams = data.streams.filter(
		(stream) => stream.state === 'DEFAULT' && stream.startedAt.getTime() > Date.now()
	);
	const pastStreams = data.streams.filter(
		(stream) => stream.state !== 'DEFAULT' && stream.startedAt.getTime() < Date.now()
	);
</script>

{#if currentStream}
	<MetaTags
		pageName="🔴 {currentStream?.title} - Clembs"
		description="Watch me live on ${currentStream.platforms
			.map((p) => socials.find((s) => s.id === p.id)?.name)
			.join(' & ')}}"
	/>
{:else if upcomingStreams.length}
	<MetaTags
		pageName="🔴 {upcomingStreams[0]?.title} - Clembs"
		description={`I'm soon streaming ${upcomingStreams[0].title} on ${upcomingStreams[0].platforms
			.map((p) => socials.find((s) => s.id === p.id)?.name)
			.join(' & ')}!\nSee you on ${upcomingStreams[0].startedAt.toLocaleString('en-GB', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		})} (CET) :)`}
	/>
{:else}
	<MetaTags
		pageName="Clembs - Livestreams"
		description={`Watch Clembs (me) live on Twitch & YouTube! I usually stream indie or party videogames, and other chill programming or homework sessions.\n\nNot streaming at the moment.`}
	/>
{/if}

{#if data.userData?.badges?.includes('CLEMBS')}
	<Button size="sm" style="outlined" href="/stream/edit">Open super secret stream manager</Button>
{/if}

<div id="stream">
	{#if upcomingStreams.length || currentStream}
		{@const stream = currentStream ?? upcomingStreams[0]}
		<span class="icon">
			<HabileHappy />
		</span>

		<header>
			<span class="label" class:live={currentStream}>
				{#if currentStream}
					I'm live!
				{:else}
					I'm streaming soon!
				{/if}
			</span>
			<h1>{stream.title}</h1>

			{#if stream.collaborators?.length}
				<span id="collaborators">
					with
					{#each stream.collaborators as collaborator}
						<Mention
							node={{
								type: 'user',
								username: collaborator.username,
							}}
							clickable={false}
						/>
						<!-- {new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(
						stream.collaborators.map((c) => c.username)
					)} -->
					{/each}
				</span>
			{/if}

			<p>
				{stream.startedAt.toLocaleString(undefined, {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
				})} -
				{#if currentStream}
					Started
				{:else}
					Starting
				{/if}
				{relativeTimeFormat(stream.startedAt)}
			</p>
		</header>

		<LinksList
			socials={[
				...stream.platforms.map((p) => {
					const social = streamSocials.find((s) => s.id === p.id);
					return {
						...social,
						name: `Watch on ${social?.name}`,
						activity: undefined,
						url: p.url,
					};
				}),
				...(stream.collaborators || []).map((c) => {
					const social = socials.find((s) => c.url.includes(s.id?.toString() ?? ''));

					return {
						...social,
						name: `Watch ${c.username}`,
						username: c.username,
						url: c.url,
						activity: undefined,
					};
				}),
			]}
		/>
	{:else}
		<span class="icon">
			<HabileNeutral />
		</span>

		<h1>I'm not streaming...</h1>

		<p>But I stream every now and then on the following platforms:</p>

		<LinksList
			socials={socials
				.filter((social) => social.id === SocialName.Twitch || social.id === SocialName.YouTube)
				.map((social) => ({ ...social, activity: undefined }))}
		/>
	{/if}

	<h2>See also</h2>

	<LinksList
		socials={[
			discord,
			{
				id: SocialName.Kofi,
				name: 'Donate',
				url: '/donate',
				icon: IconHeart,
				description: 'Support me and my work',
			},
		]}
	/>

	{#if pastStreams.length}
		<h2>Previous streams</h2>

		<div id="previous-streams">
			{#each pastStreams as stream}
				<Stream {stream} userData={data.userData} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	#stream {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto;

		header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 1rem;

			#collaborators {
				font-size: 1.5rem;
				font-weight: 500;
				margin-top: -0.5rem;
				margin-bottom: 0.5rem;
			}
		}

		.label {
			font-size: 0.9rem;
			border: 1px solid var(--color-outline);
			border-radius: 9rem;
			padding: 0.25rem 0.5rem;
			background-color: var(--color-surface);

			&.live {
				background-color: var(--color-error);
				color: var(--color-on-error);
				font-weight: 500;
			}
		}

		h1 {
			text-align: center;
			text-wrap: balance;
		}
	}

	.icon :global(svg) {
		max-width: 5rem;
		max-height: 5rem;
	}

	#previous-streams {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
</style>
