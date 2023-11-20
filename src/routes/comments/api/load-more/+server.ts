import { number, object, optional, parse, regex, string } from 'valibot';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getComments } from '$lib/helpers/getComments';
import { SnowflakeRegex } from '@purplet/utils';
import { PROJECT_ID_REGEX } from '$lib/helpers/regex';

export const GET: RequestHandler = async ({ url }) => {
	const params = Object.fromEntries(url.searchParams.entries());

	const schema = object({
		projectId: optional(string([regex(PROJECT_ID_REGEX)])),
		parentId: optional(string([regex(SnowflakeRegex)])),
		page: number(),
		userId: optional(string()),
	});

	const { projectId, page, parentId, userId } = parse(schema, {
		...params,
		page: Number(params.page),
	});

	const comments = await getComments({
		page,
		projectId,
		parentId,
		onlyParentComments: true,
		userId,
	});

	console.log(comments);

	return json(comments);
};
