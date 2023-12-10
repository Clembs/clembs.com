import { number, object, optional, parse, regex, string } from 'valibot';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getComments } from '$lib/helpers/getComments';
import { SnowflakeRegex } from '@purplet/utils';
import { PROJECT_ID_REGEX } from '$lib/helpers/regex';

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const params = Object.fromEntries(url.searchParams.entries());

	const schema = object({
		projectId: optional(string([regex(PROJECT_ID_REGEX)])),
		parentId: optional(string([regex(SnowflakeRegex)])),
		userId: optional(string()),
	});

	const { projectId, parentId, userId } = parse(schema, params);

	const comments = await getComments({
		projectId,
		parentId,
		onlyParentComments: true,
		userId,
	});

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
	});

	return json(comments);
};
