import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import { getHighlighter } from 'shiki';
import preprocess from 'svelte-preprocess';
import { imagetools } from '@zerodevx/svelte-img/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.mdx'],
	preprocess: [
		mdsvex({
			extensions: ['.mdx'],
			smartypants: true,
			highlight: {
				async highlighter(code, lang, meta) {
					const highlighter = await getHighlighter({
						theme: 'github-dark-dimmed',
					});

					return highlighter.codeToHtml(code, { lang });
				},
			},
		}),
		preprocess(),
		imagetools(),
	],

	kit: {
		adapter: adapter(),
		// csrf: { checkOrigin: false },
	},
};

export default config;
