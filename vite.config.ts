import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	optimizeDeps: {
		include: ['@tabler/icons-svelte'],
	},
	plugins: [sveltekit()],
};

export default config;
