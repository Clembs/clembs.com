import adapter from '@sveltejs/adapter-netlify';
import { mdsvex } from 'mdsvex';
import { getHighlighter } from 'shiki';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.mdx'],
	preprocess: [
		mdsvex({
			extensions: ['.mdx'],
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
	],

	kit: {
		adapter: adapter(),
	},
};

export default config;
