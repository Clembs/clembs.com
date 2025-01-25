<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { PageData } from './$types';
	import Comments from './Comments.svelte';

	export let data: PageData;
</script>

<MetaTags
	siteName="Comments - Clembs"
	pageName="Comments"
	description="Leave a question, a suggestion or just wave hi!"
/>

<Comments comments={data.comments} />
