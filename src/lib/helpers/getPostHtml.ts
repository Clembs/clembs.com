import type { Article } from '$lib/data/blog-articles';

export async function getPostHtml(article: Article): Promise<string> {
	const rawMd = (await import(
		`./src/routes/blog/(post)/${article.categoryId}/${article.slug}/+page.mdx`
	)) as {
		default: {
			render: () => {
				html: string;
			};
		};
	};

	const { html } = rawMd.default.render();

	return html;
}
