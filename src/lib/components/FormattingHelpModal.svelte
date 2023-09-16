<script lang="ts">
	import Mention from '../../routes/comments/Comment/Mention.svelte';
	import Emoji from './Emoji.svelte';
	import InfoBox from './InfoBox.svelte';
	import Key from './Key.svelte';
	import Modal from './Modal.svelte';

	export let showModal = false;
	export let showMarkdown = true;
</script>

<Modal bind:showModal>
	<h1 slot="title">Comment formatting help</h1>

	<table>
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
						projectType: 'software',
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

		{#if showMarkdown}
			<tr>
				<td>Bold text</td>
				<td> <code>**text**</code> </td>
				<td> <strong>WOW!!!</strong> </td>
			</tr>

			<tr>
				<td>Italic text</td>
				<td> <code>_text_</code> </td>
				<td> <em>so subtle...</em> </td>
			</tr>

			<tr>
				<td>Strikethrough text</td>
				<td> <code>~~text~~</code> </td>
				<td> <s>not here</s> </td>
			</tr>

			<tr>
				<td>Underline text</td>
				<td> <code>__text__</code> </td>
				<td> <u>real</u> </td>
			</tr>

			<tr>
				<td>Masked links</td>
				<td> <code>&lbrack;text&rbrack;(link)</code> </td>
				<td> <a target="_blank" href="https://startpage.com">Startpage!</a> </td>
			</tr>
		{/if}
	</table>

	{#if showMarkdown}
		<div class="keyboard-shortcuts">
			<InfoBox type="info">
				Press <Key>Ctrl/⌘</Key>
				<Key>/</Key> for a list of comment formatting shortcuts.
			</InfoBox>
		</div>
	{/if}
</Modal>

<style lang="scss">
	table {
		text-align: left;
		padding: 0;
		width: 100%;
		border-spacing: 0;
		border-collapse: separate;
		text-decoration: inherit;
		margin-top: 0;
		border: 1px solid var(--color-outline);
		overflow: hidden;
		border-radius: 0.5rem;
		background-color: var(--color-background);

		tr {
			text-decoration: inherit;
			border-radius: 0.75rem;

			td,
			th {
				padding: 0.75rem 1rem;
			}

			&:not(:last-child) {
				td,
				th {
					border-bottom: 1px solid var(--color-outline);
				}
			}

			th {
				text-align: left;
				font-weight: 600;
				padding-bottom: 0.75rem;
				background-color: var(--color-surface);
			}
		}
	}
	.keyboard-shortcuts {
		padding-top: 1rem;
	}

	@media (max-width: 768px) {
		.keyboard-shortcuts {
			display: none;
		}

		table {
			font-size: 0.9rem;
			margin: 0 -1rem;
			width: calc(100% + 2rem);

			tr td,
			tr th {
				padding: 1rem 0.5rem;
			}
		}
	}
</style>
