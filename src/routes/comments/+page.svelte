<script lang="ts">
	import MetaTags from '$lib/components/MetaTags.svelte';
	import type { PageData } from './$types';
	import Comments from './Comments.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<MetaTags
	siteName="Comments - Clembs"
	pageName="Comments"
	description="Leave a question, a suggestion or just wave hi!"
/>

<Comments comments={data.comments} />
