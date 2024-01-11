import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const streams = await db.query.streams.findMany();

	const currentStream = streams.find(
		(stream) => stream.state === 'DEFAULT' && stream.startedAt.getTime() < Date.now()
	);

	return {
		streams,
		...(currentStream
			? {
					themeGradient: {
						from: '#ff3939',
						to: '#ff3939',
					},
			  }
			: {}),
		...(await parent()),
	};
};
