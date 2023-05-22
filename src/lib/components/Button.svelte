<script lang="ts">
	export let href = '';
	export let style: 'primary' | 'secondary' = 'primary';
	export let disabled = false;
	export let type: 'submit' | 'button' = 'button';
	// export let background = 'var(--color-primary)';
	// export let color = 'white';
</script>

{#if href && !disabled}
	<a class="button {style}" {href}>
		<slot name="icon" />
		<slot />
	</a>
{:else}
	<button on:click on:submit {type} class="button {style}" {disabled}>
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

		font-weight: 700;
		padding: 0.8rem 1.6rem;
		line-height: 1;
		font-size: 1.2rem;
		border: 1px solid black;
		border-radius: 0.5rem;
		user-select: none;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		position: relative;
		// transition: all 100ms ease-in;
		background-color: var(--button-bg);
		color: var(--button-text);
	}
</style>
