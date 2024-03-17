import { blogPosts } from '$lib/data/blog';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({
	url,
	route,
	locals: { getUserData },
	setHeaders,
}) => {
	const project = blogPosts.find(({ id }) => id === url.pathname.split('/').at(-1));
	const type = 'design';

	if (!route.id || !project) {
		throw error(404);
	}

	const comments = await getComments({
		onlyParentComments: true,
		skipMentions: true,
		projectId: `${type}/${project.id}`,
	});

	const userData = await getUserData();

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
	});

	return {
		...project,
		type,
		comments,
		userData,
		navButton: {
			label: 'Projects',
			href: '/projects',
		},
	};
};
