import { db } from '$lib/db';
import type { Comment } from '$lib/db/types';
import { isNull } from 'drizzle-orm';

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
}): Promise<Comment[]> {
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
