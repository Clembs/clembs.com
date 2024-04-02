import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { archives } from '$lib/data/archive';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({ url, setHeaders, depends }) => {
	const project = archives.find(({ id }) => id === url.pathname.split('/').at(-1));

	if (!project) {
		throw error(404);
	}

	const comments = await getComments({
		projectId: `archive/${project.id}`,
	});

	depends('comments');

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
	});

	return {
		...project,
		comments,
		navButton: {
			label: 'Projects',
			href: '/projects',
		},
	};
};
