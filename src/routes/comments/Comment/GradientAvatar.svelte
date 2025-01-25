<script lang="ts">
	import type { LegacyComment } from '$lib/db/types';

	export let user: LegacyComment['author'];
	export let size = '2.25rem';
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
