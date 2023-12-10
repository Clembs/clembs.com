import { db } from '$lib/db';
import { comments } from '$lib/db/schema';
import { and, eq, isNull, sql } from 'drizzle-orm';

export async function getComment(
	commentId: string,
	options?: {
		includeParentComment?: boolean;
		skipMentions?: boolean;
	}
) {
	const results = await db.query.comments.findFirst({
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
			...(options?.includeParentComment
				? {
						parentComment: {
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
						},
				  }
				: {}),
			...(options?.skipMentions
				? {}
				: {
						mentionedUsers: {
							with: {
								user: {
									columns: {
										id: true,
										username: true,
										badges: true,
									},
								},
							},
						},
				  }),
			childComments: {
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
					childComments: {
						columns: {
							id: true,
						},
						with: {
							author: {
								columns: {
									username: true,
								},
							},
						},
					},
					...(options?.skipMentions
						? {}
						: {
								mentionedUsers: {
									with: {
										user: {
											columns: {
												id: true,
												username: true,
												badges: true,
											},
										},
									},
								},
						  }),
				},
			},
		},
		where: ({ id }, { eq }) => eq(id, commentId),
	});

	return results;
}

export async function getComments(options?: {
	parentId?: string;
	projectId?: string;
	userId?: string;
	onlyParentComments?: boolean;
	includeParentComment?: boolean;
	skipMentions?: boolean;
}) {
	const results = await db.query.comments.findMany({
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
			...(options?.includeParentComment
				? {
						parentComment: {
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
						},
				  }
				: {}),
			...(options?.skipMentions
				? {}
				: {
						mentionedUsers: {
							with: {
								user: {
									columns: {
										id: true,
										username: true,
										badges: true,
									},
								},
							},
						},
				  }),
			childComments: {
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
					childComments: {
						columns: {
							id: true,
						},
						with: {
							author: {
								columns: {
									username: true,
								},
							},
						},
					},
					...(options?.includeParentComment
						? {
								parentComment: {
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
										childComments: {
											columns: {
												id: true,
											},
											with: {
												author: {
													columns: {
														username: true,
													},
												},
											},
										},
									},
								},
						  }
						: {}),
					...(options?.skipMentions
						? {}
						: {
								mentionedUsers: {
									with: {
										user: {
											columns: {
												id: true,
												username: true,
												badges: true,
											},
										},
									},
								},
						  }),
				},
			},
		},
		orderBy: ({ createdAt }, { desc }) => desc(createdAt),
		where: ({ parentId, projectId, userId }, { and, eq }) =>
			and(
				//@ts-ignore
				...[
					options?.onlyParentComments ? isNull(parentId) : null,
					options?.parentId ? eq(parentId, options.parentId) : isNull(parentId),
					options?.projectId ? eq(projectId, options.projectId) : isNull(projectId),
					options?.userId ? eq(userId, options.userId) : null,
				].filter(Boolean)
			),
	});

	return results;
}

export async function getCommentsCount(options?: {
	parentId?: string;
	projectId?: string;
	userId?: string;
	onlyParentComments?: boolean;
}) {
	const count = await db
		.select({
			count: sql<number>`cast(count(${comments.id}) as int)`,
		})
		.from(comments)
		.where(
			and(
				//@ts-ignore
				...[
					options?.onlyParentComments ? isNull(comments.parentId) : null,
					options?.parentId ? eq(comments.parentId, options.parentId) : isNull(comments.parentId),
					options?.projectId
						? eq(comments.projectId, options.projectId)
						: isNull(comments.projectId),
					options?.userId ? eq(comments.userId, options.userId) : null,
				].filter(Boolean)
			)
		);

	return count[0].count;
}
