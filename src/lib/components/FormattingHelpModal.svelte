<script lang="ts">
	import Mention from '../../routes/comments/Comment/Mention.svelte';
	import Emoji from './Emoji.svelte';
	import Modal from './Modal.svelte';
	import Table from './Table/Table.svelte';

	export let showModal = false;
</script>

<Modal bind:showModal>
	<h2 slot="title">Comment formatting help</h2>

	<Table>
		<tr>
			<th />
			<th>Syntax</th>
			<th>Preview</th>
		</tr>

		<tr>
			<td>Mention a user</td>
			<td>
				<code>@username</code>
			</td>
			<td>
				<Mention node={{ username: 'Clembs', type: 'user' }} />
			</td>
		</tr>

		<tr>
			<td>Mention a project</td>
			<td>
				<code>#projectShortName</code>
			</td>
			<td>
				<Mention
					node={{
						type: 'project',
						projectId: 'crbt',
						projectType: 'archive',
					}}
				/>
			</td>
		</tr>

		<tr>
			<td>Use emoji</td>
			<td>
				<code>:emojiName:</code>
			</td>
			<td>
				<Emoji name="happy" src="/assets/emotes/happy.webp" />
			</td>
		</tr>
	</Table>
</Modal>

<style>
	h2 {
		margin-bottom: 1rem;
	}
</style>
