// import { db } from '$lib/db';
// import type { LegacyComment } from '$lib/db/types';
// import { isNull } from 'drizzle-orm';
// import { nestComments } from './groupComments';

// export async function getComments(projectId?: string): Promise<LegacyComment[]> {
// 	const results = await db.query.comments.findMany({
// 		where: ({ projectId: dbProjectId }, { and, eq }) =>
// 			and(projectId ? eq(dbProjectId, projectId) : isNull(dbProjectId)),
// 		orderBy: ({ createdAt }, { desc }) => desc(createdAt),
// 		with: {
// 			author: {
// 				columns: {
// 					id: true,
// 					username: true,
// 					badges: true,
// 				},
// 			},
// 			score: {
// 				columns: {
// 					type: true,
// 					userId: true,
// 				},
// 			},
// 		},
// 	});

// 	return nestComments(results);
// }
