<script lang="ts">
	export let href = '';
	export let style: 'primary' | 'secondary' = 'primary';
	export let inline = false;
	export let disabled = false;
	export let background = 'var(--color-primary)';
	export let color = 'white';
</script>

{#if href && !disabled}
	<a class="button {style}" class:inline {href}>
		<slot name="icon" />
		<slot />
	</a>
{:else}
	<button on:click on:submit class="button {style}" class:inline {disabled}>
		<slot name="icon" />
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		&.primary {
			--button-bg: black;
			--button-text: white;
		}
		&.secondary {
			--button-bg: white;
			--button-text: black;
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&.inline {
			text-align: center;
			width: 100%;
		}

		appearance: none;
		padding: 0.5rem 2.6rem;
		font-weight: 500;
		border: 1px solid black;
		font-size: larger;
		height: min-content;

		border-radius: 1.5rem;
		user-select: none;
		cursor: pointer;
		display: block;
		width: max-content;
		text-decoration: none;
		transition: all 100ms ease-in;
		background-color: var(--button-bg);
		color: var(--button-text);

		&:hover {
			border-bottom: 3px solid black;
		}
		&:active {
		}
	}
</style>
