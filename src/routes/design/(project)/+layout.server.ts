import { designPosts } from '$lib/data/design';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({ url, route, locals: { getUserData } }) => {
	const project = designPosts.find(({ id }) => id === url.pathname.split('/').at(-1));
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

	return {
		...project,
		type,
		comments,
		userData,
	};
};
