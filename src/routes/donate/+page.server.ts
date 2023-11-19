import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		donations: await db.query.donations.findMany({
			orderBy: ({ createdAt }, { desc }) => desc(createdAt),
			with: {
				user: {
					columns: {
						username: true,
					},
				},
			},
		}),
	};
};
