import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import entryShakingPlugin from 'vite-plugin-entry-shaking';

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools({
			profiles: {
				run: new URLSearchParams('w=480;720;1024&format=avif;webp;png'),
			},
		}),
		await entryShakingPlugin({
			targets: ['@tabler/icons-svelte'],
			extensions: ['svelte'],
		}),
	],
});
