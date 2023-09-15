import { db } from '$lib/db';
import { comments, mentions } from '$lib/db/schema';
import { generateSnowflake } from '$lib/helpers/snowflake';
import { fail } from '@sveltejs/kit';
import { isNull, type InferModel } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { rateLimit } from '$lib/helpers/handleRateLimit';
import { PROJECT_ID_REGEX } from '$lib/helpers/regex';
import { brandingData } from '$lib/data/branding';
import { softwareData } from '$lib/data/software';
import { bannedWords } from '$lib/helpers/bannedWords';
import { parseMentions, type ParserOutputUserStructure } from '$lib/helpers/parseMentions';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const user = session?.user ?? null;

	const comments = await db.query.comments.findMany({
		with: {
			author: true,
			childComments: {
				with: {
					author: true,
				},
			},
			score: true,
			mentionedUsers: {
				with: {
					user: true,
				},
			},
		},
		where: ({ parentId, projectId }, { and }) => and(isNull(parentId), isNull(projectId)),
	});

	return { comments, user };
};

export const actions: Actions = {
	post: async ({ request, locals, getClientAddress }) => {
		const formData = await request.formData();

		if (!formData) {
			return fail(400);
		}

		const currentUser = await locals.getUserData();
		const ipAddress = getClientAddress();

		if (currentUser?.badges?.includes('BLOCKED')) {
			return fail(400, {
				message: 'Your account is restricted.',
			});
		}

		const content = formData
			.get('content')
			?.toString()
			?.trim()
			?.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '');

		if (!content) {
			return fail(400, {
				message: 'Missing content',
			});
		}

		if (bannedWords.find((word) => content.toLowerCase().includes(word))) {
			return fail(400, {
				message: 'Your comment includes words which are banned.',
			});
		}

		const rateLimited = rateLimit(currentUser?.id || ipAddress, 60 * 1000, currentUser ? 5 : 1);

		if (rateLimited) {
			return fail(429, {
				message: 'Rate limited. Try again later.',
			});
		}

		const parentCommentId = formData.get('parent-comment')?.toString();

		if (parentCommentId) {
			const comment = await db.query.comments.findFirst({
				where: ({ id }, { eq }) => eq(id, parentCommentId),
			});

			if (!comment) {
				return fail(400, {
					message: 'Invalid parent comment ID',
				});
			}
		}

		const projectId = formData.get('project-id')?.toString();

		if (projectId) {
			const regex = projectId.match(PROJECT_ID_REGEX);

			if (!regex) {
				return fail(404, {
					message: 'Cannot find project.',
				});
			}

			const project = [...(regex[1] === 'branding' ? brandingData : softwareData)].find(
				({ id }) => id === regex[2]
			);

			if (!project) {
				return fail(404, {
					message: 'Cannot find project.',
				});
			}
		}

		const input: InferModel<typeof comments, 'insert'> = {
			id: generateSnowflake(),
			content: content,
			userId: currentUser?.id,
			parentId: parentCommentId,
			projectId: projectId,
		};

		await db.insert(comments).values(input);

		const parsedContent = parseMentions(content);
		const mentionedUsers = parsedContent?.filter(
			(v) => typeof v !== 'string' && v.type === 'user'
		) as ParserOutputUserStructure[];

		if (mentionedUsers.length) {
			for (const mentionedUser of mentionedUsers) {
				const userData = await db.query.users.findFirst({
					where: ({ username }, { eq }) => eq(username, mentionedUser.username),
				});

				if (userData) {
					await db.insert(mentions).values({
						commentId: input.id,
						userId: userData.id,
					});
				}
			}
		}

		return { success: true };
	},
};
