<script lang="ts">
	import BottomSheet from '$lib/components/BottomSheet.svelte';
	import type { Comment, User } from '$lib/db/types';
	import Comments from './Comments.svelte';

	export let userData: User | null | undefined;
	export let parentComment: Comment | null | undefined = null;
	export let projectId: string | null = null;
	export let comments: Comment[];
	export let showLoginModal = false;
	export let showSheet = false;
</script>

<BottomSheet bind:showSheet>
	<Comments {userData} {comments} {parentComment} bind:showModal={showLoginModal} {projectId} />
</BottomSheet>
