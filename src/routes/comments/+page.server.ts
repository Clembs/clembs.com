import { db } from '$lib/db';
import { comments } from '$lib/db/schema';
import { generateSnowflake } from '$lib/helpers/snowflake';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { rateLimit } from '$lib/helpers/handleRateLimit';
import { bannedWords } from '$lib/helpers/bannedWords';
import { getComments } from '$lib/helpers/getComments';
import { allObjectIds } from '$lib/data';

export const load: PageServerLoad = async ({ locals, setHeaders, depends }) => {
	const session = await locals.getSession();
	const user = session?.user ?? null;

	const comments = await getComments();

	depends('comments');

	setHeaders({
		'Cache-Control': 'public, max-age=1200',
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
			// eslint-disable-next-line no-misleading-character-class
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

		const objectId = formData.get('project-id')?.toString();

		if (objectId) {
			const objectExists = allObjectIds.includes(objectId);

			if (!objectExists) {
				return fail(404, {
					message: 'Cannot find project or blog post.',
				});
			}
		}

		const maxCommentLength = 420;

		if (content.length > maxCommentLength) {
			return fail(400, {
				message: `Comment length must be under ${maxCommentLength} characters.`,
			});
		}

		const input: typeof comments.$inferInsert = {
			id: generateSnowflake(),
			content: content,
			userId: currentUser?.id,
			parentId: parentCommentId,
			projectId: objectId,
		};

		await db.insert(comments).values(input);

		return { success: true };
	},
};
