<script lang="ts">
	import InfoBox from '$lib/components/InfoBox.svelte';
	import type { PageData } from './$types';
	import Comments from './Comments.svelte';

	export let data: PageData;
</script>

<InfoBox type="note">
	<span slot="title">Welcome to the Comments section!</span>
	I created this so you can leave feedback, report bugs, ask questions and be chill.<br />
	No spam or harmful content allowed. Use common sense.
</InfoBox>

<Comments comments={data.comments} userData={data.userData} />
