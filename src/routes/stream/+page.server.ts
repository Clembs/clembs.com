import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const streams = await db.query.streams.findMany();

	return {
		streams,
		...(await parent()),
	};
};
