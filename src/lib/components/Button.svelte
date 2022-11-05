<script lang="ts">
	export let background = 'var(--color-primary)';
	export let color = 'white';
	export let href: string | null = null;
</script>

{#if href}
	<a
		{href}
		class="button"
		style="
--color-bg: {background};
--color-text: {color};
"
	>
		<slot />
	</a>
{:else}
	<button
		on:click
		class="button"
		style="
--color-bg: {background};
--color-text: {color};
"
	>
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		appearance: none;
		border: none;
		padding: 15px 20px;
		background: var(--color-bg);
		color: var(--color-text);
		font-weight: 600;
		font-size: larger;

		border-radius: 10px;
		user-select: none;
		cursor: pointer;
		display: block;
		width: max-content;
		transition: border-radius 0.1s ease, transform 0.2s ease-out;

		&:hover {
			border-radius: 30px;
			transition: border-radius 0.2s ease, transform 0.2s ease-out;
			text-decoration: none;
			transform: scale(1.05);
		}
	}
</style>
