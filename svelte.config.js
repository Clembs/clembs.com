import adapter from '@svelte/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { getHighlighter } from 'shikiji';
import { imagetools } from '@zerodevx/svelte-img/vite';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.mdx'],
	preprocess: [
		mdsvex({
			extensions: ['.mdx'],
			smartypants: true,
			highlight: {
				async highlighter(code, lang) {
					const highlighter = await getHighlighter({
						langs: [lang || 'plaintext'],
						themes: ['github-dark-dimmed'],
					});

					return highlighter.codeToHtml(code, { lang });
				},
			},
		}),
		vitePreprocess(),
		imagetools(),
	],

	kit: {
		adapter: adapter(),
		// csrf: { checkOrigin: false },
	},
};

export default config;
