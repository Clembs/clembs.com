import { db } from '$lib/db';
import type { Comment } from '$lib/db/types';
import { isNull } from 'drizzle-orm';
import { nestComments } from './groupComments';

export async function getComments(options?: {
	projectId?: string;
	userId?: string;
}): Promise<Comment[]> {
	const results = await db.query.comments.findMany({
		where: ({ projectId, userId }, { and, eq }) =>
			and(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				...[
					options?.projectId ? eq(projectId, options.projectId) : isNull(projectId),
					options?.userId ? eq(userId, options.userId) : null,
				].filter(Boolean)
			),
		orderBy: ({ createdAt }, { desc }) => desc(createdAt),
		with: {
			author: {
				columns: {
					id: true,
					username: true,
					badges: true,
				},
			},
			score: {
				columns: {
					type: true,
					userId: true,
				},
			},
		},
	});

	return nestComments(results);
}
