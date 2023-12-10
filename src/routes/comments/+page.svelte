<script lang="ts">
	import type { PageData } from './$types';
	import Comments from './Comments.svelte';

	export let data: PageData;
</script>

<div class="intro">
	Leave a question, a suggestion or just wave hi! <br />
	Inspired by sites like YouTube and Reddit, one may say this page is a mix of a guestbook and a microblog.<br
	/>
	Logging in is optional, but it will allow you to choose a username and to vote on other comments.
</div>

<Comments comments={data.comments} userData={data.userData} />

<style lang="scss">
	.intro {
		margin: 1rem;
	}
</style>
