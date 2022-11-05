<script lang="ts">
	export let label: string;
	export let background: string;
	export let color: string;
</script>

<div
	class="tag"
	style="
  --color-bg: {background};
  --color-text: {color};
"
>
	{label}
</div>

<style lang="scss">
	.tag {
		padding: 10px 15px;
		background: var(--color-bg);
		color: var(--color-text);
		font-weight: 600;
		border-radius: 10px;
		user-select: none;
	}
</style>
