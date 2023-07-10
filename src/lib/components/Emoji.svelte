<script lang="ts">
	export let src: string;
	export let name: string;
</script>

<span class="emoji-wrapper">
	<img aria-label=":{name}:" draggable="false" class="emoji" {src} alt=":{name}" title=":{name}:" />
</span>

<style lang="scss">
	.emoji {
		display: inline-block;
		object-fit: contain;
		cursor: pointer;
		width: 1.375em;
		height: 1.375em;
		vertical-align: bottom;
	}
</style>
