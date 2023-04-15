<script lang="ts">
	export let label: string;
</script>

<div class="tag">
	{label}
</div>

<style lang="scss">
	.tag {
		padding: 0.3rem 1rem;
		border: 1px solid black;
		background-color: white;
		color: black;
		border-radius: 999px;
		user-select: none;
		transition: background-color 0.2s ease-out;

		&:hover {
			background-color: lightgray;
			transition: background-color 0.2s ease-out;
		}
	}
</style>
