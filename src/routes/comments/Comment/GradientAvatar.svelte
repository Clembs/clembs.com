<script lang="ts">
	import type { LegacyComment } from '$lib/db/types';

	interface Props {
		user: LegacyComment['author'];
		size?: string;
	}

	let { user, size = '2.25rem' }: Props = $props();
</script>

<div
	class="avatar"
	style="--color-a: {user.gradient.from}; --color-b: {user.gradient.to}; --size: {size};"
	title={user.username}
></div>

<style lang="scss">
	.avatar {
		position: relative;
		height: var(--size);
		width: var(--size);
		border-radius: 99rem;
		background: linear-gradient(45deg, var(--color-a), var(--color-b));
		border: 1px solid var(--color-outline);
		flex-shrink: 0;

		&::after {
			content: '';
			display: block;
			position: relative;
			height: 100%;
			width: 100%;
			background-image: url('/assets/silhouette-black.webp');
			background-size: cover;
			opacity: 0.75;
		}
	}
</style>
