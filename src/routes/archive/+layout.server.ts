import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { archives } from '$lib/data/archive';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({ url, locals: { getUserData }, setHeaders }) => {
	const project = archives.find(({ id }) => id === url.pathname.split('/').at(-1));

	if (!project) {
		throw error(404);
	}

	const comments = await getComments({
		projectId: `archive/${project.id}`,
	});

	const userData = await getUserData();

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
	});

	return {
		...project,
		comments,
		userData,
		navButton: {
			label: 'Projects',
			href: '/projects',
		},
	};
};
