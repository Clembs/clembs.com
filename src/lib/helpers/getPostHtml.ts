import type { BlogPost } from '$lib/data/blog';

export async function getPostHtml(post: BlogPost): Promise<string> {
	const rawMd = (await import(
		`./src/routes/blog/(post)/${post.categoryId}/${post.id}/+page.mdx`
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
