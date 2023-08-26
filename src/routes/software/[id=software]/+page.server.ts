import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { softwareData } from '$lib/data/software';

export const load: PageServerLoad = async ({ params, url, locals: { getUserData } }) => {
	const project = softwareData.find(({ id }) => id === url.pathname.split('/').at(-1));
	const type = 'software';

	if (!params.id || !project) {
		throw error(404);
	}

	const comments = await db.query.comments.findMany({
		with: {
			author: true,
			childComments: true,
		},
		where: ({ projectId }, { eq }) => eq(projectId, `${type}/${project.id}`),
	});

	const userData = await getUserData();

	return {
		...project,
		type,
		comments,
		userData,
	};
};
