<script lang="ts">
	import type { PageData } from './$types';
	import Comments from './Comments.svelte';

	export let data: PageData;
</script>

<Comments comments={data.comments} userData={data.userData} />
