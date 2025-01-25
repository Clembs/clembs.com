<script lang="ts">
	type InputType = 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' | 'search';

	interface Props {
		type?: InputType;
		required?: boolean;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		value?: string;
		maxlength?: number | undefined;
		minlength?: number | undefined;
		multiline?: boolean;
		name?: string;
		label?: string;
		height?: string;
		oninput?: (event: Event) => void;
		onfocus?: (event: Event) => void;
		onblur?: (event: Event) => void;
		onkeydown?: (event: Event) => void;
		[key: string]: any;
	}

	let {
		type = 'text',
		required = true,
		placeholder = '',
		disabled = false,
		readonly = false,
		value = $bindable(''),
		maxlength = undefined,
		minlength = undefined,
		multiline = false,
		name = '',
		label = '',
		height = '200px',
		oninput,
		onfocus,
		onblur,
		onkeydown,
		...rest
	}: Props = $props();
</script>

<div class="text-input">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	{#if multiline}
		<textarea
			style:--height={height}
			bind:value
			{oninput}
			{onfocus}
			{onblur}
			{onkeydown}
			{minlength}
			{maxlength}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{name}
			id={name}
			{...rest}
		></textarea>
	{:else}
		<input
			{...{ type }}
			bind:value
			{oninput}
			{onfocus}
			{onblur}
			{onkeydown}
			{minlength}
			{maxlength}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{name}
			id={name}
			{...rest}
		/>
	{/if}
</div>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
		text-align: left;
		gap: 0.5rem;
		// margin-bottom: 0.5rem;
		width: 100%;

		label {
			font-size: 0.9rem;
			font-weight: 500;
		}

		textarea,
		input {
			border: 1px solid var(--color-outline);
			background-color: var(--color-surface);
			color: var(--color-on-background);
			padding: 0.75rem 1rem;
			border-radius: 0.75rem;
			font-family: inherit;
			font-size: inherit;
			width: 100%;
			transition: height 0.2s cubic-bezier(0.1, 0.6, 0.4, 1);
		}

		textarea {
			resize: none;
			height: var(--height);
		}
	}
</style>
