import { designPosts } from '$lib/data/design';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({ url, route, locals: { getUserData } }) => {
	const project = designPosts.find(({ id }) => id === url.pathname.split('/').at(-1));
	const type = 'branding';

	if (!route.id || !project) {
		throw error(404);
	}

	const comments = await getComments({
		projectId: `${type}/${project.id}`,
	});
	// const comments = await db.query.comments.findMany({
	// 	with: {
	// 		author: true,
	// 		childComments: {
	// 			with: {
	// 				author: true,
	// 			},
	// 		},
	// 	},
	// 	where: ({ projectId, parentId }, { and, eq }) =>
	// 		and(eq(projectId, `${type}/${project.id}`), isNull(parentId)),
	// });

	const userData = await getUserData();

	return {
		...project,
		type,
		comments,
		userData,
	};
};
