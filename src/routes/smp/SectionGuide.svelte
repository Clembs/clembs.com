<section id="getting-started">
	<h2>Getting started</h2>

	<ol>
		<li>
			Install Minecraft on version 1.20.6 (not the latest!).

			<blockquote>
				<h4>Pro tip!</h4>

				<p>
					For best gameplay, install a
					<a
						href="https://modrinth.com/modpack/fabulously-optimized/versions#all-versions"
						target="_blank"
						rel="noopener noreferrer"
					>
						performance modpack
					</a>
					if you're using a graphics card or
					<a href="https://optifine.net/downloads" target="_blank" rel="noopener noreferrer">
						OptiFine
					</a> otherwise.
				</p>
			</blockquote>
		</li>
		<li>When the game launches, select "Multiplayer".</li>
		<li>
			Click "Add Server" and enter
			<code>smp.clembs.com</code> in the address field.
		</li>
		<li>Click "Done", then double-click the newly added server.</li>
		<li>
			You'll be prompted to create a password, to prevent data theft.<br />
			Once that's made, log in and you're in!
		</li>
	</ol>
</section>

<style lang="scss">
	#getting-started {
		display: flex;
		flex-direction: column;
		margin: 2rem 0;

		h2 {
			font-size: 1.75rem;
			text-align: center;
			margin-bottom: 1rem;
		}

		ol {
			margin: 0;
			padding: 0;
			list-style-position: inside;
		}

		li {
			padding: 1rem;
			border-radius: 1rem;
			border: 1px solid var(--color-outline);
			font-size: 1.25rem;
			margin-bottom: 0;

			blockquote {
				font-size: 1rem;
				margin: 0;
				padding: 1rem;
				margin-top: 1rem;
				border-radius: 0.5rem;
				background-color: var(--color-surface);
				border: 1px solid var(--color-outline);
			}
		}
	}
</style>
