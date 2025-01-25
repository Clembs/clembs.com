import type { PageServerLoad } from './$types';
import commentsJSON from '$lib/data/comments.json' assert { type: 'json' };
import type { LegacyComment } from '$lib/db/types';

export const load: PageServerLoad = async ({ setHeaders, depends }) => {
	const comments: LegacyComment[] = commentsJSON;

	depends('comments');

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
	});

	return { comments };
};
