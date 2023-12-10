import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { softwareData } from '$lib/data/software';
import { getComments } from '$lib/helpers/getComments';

export const load: LayoutServerLoad = async ({ url, locals: { getUserData } }) => {
	const project = softwareData.find(({ id }) => id === url.pathname.split('/').at(-1));
	const type = 'software';

	if (!project) {
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
		navButton: {
			label: 'Projects',
			href: '/projects',
		},
	};
};
