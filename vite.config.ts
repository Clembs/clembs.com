import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import entryShakingPlugin from 'vite-plugin-entry-shaking';

const config: UserConfig = {
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
};

export default config;
