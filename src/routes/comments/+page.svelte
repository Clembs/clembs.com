<script lang="ts">
	import type { PageData } from './$types';
	import Comments from './Comments.svelte';

	export let data: PageData;
</script>

<div class="intro">
	Welcome to Comments! I added this page so you can comment on my website, projects, and discuss! <br
	/>
	Heavily inspired by YouTube and Reddit, you can also create an account or log into it to vote on comments
	and have a username.
</div>

<Comments count={data.count} comments={data.comments} userData={data.userData} />

<style lang="scss">
	.intro {
		margin: 1rem;
	}
</style>
