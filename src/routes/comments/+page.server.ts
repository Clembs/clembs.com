import { db } from '$lib/db';
import { comments, mentions } from '$lib/db/schema';
import { generateSnowflake } from '$lib/helpers/snowflake';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { rateLimit } from '$lib/helpers/handleRateLimit';
import { bannedWords } from '$lib/helpers/bannedWords';
import { parseMentions, type ParserOutputUserStructure } from '$lib/helpers/parseMentions';
import { emailHtmlTemplate, sendEmail } from '$lib/helpers/sendEmail';
import { defaultUserPreferences } from '$lib/db/UserPreferences';
import { dateFormat } from '$lib/helpers/dateFormat';
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

					if (
						userData.id !== currentUser?.id &&
						(userData.preferences ?? defaultUserPreferences).email.mentioned
					) {
						await sendEmail(
							{
								subject: `${
									currentUser?.username ? `@${currentUser.username}` : 'A guest user'
								} mentioned you in a comment.`,
								html: emailHtmlTemplate(`
<img
	src="https://c.clembs.com/files/67dafdd960982dba38.png"
	alt="Habile smiling"
	height="52"
/>

<h2>${currentUser?.username ?? 'A guest user'} mentioned you in a clembs.com comment.</h2>

<div
	style="
		border: 1px solid black;
		box-shadow: 0 1px 0 0 black;
		padding: 12px;
		padding-bottom: 32px;
		border-radius: 8px;
		max-width: max-content;
	"
>
	<h3 style="margin: 0">
		${currentUser?.username ?? 'Guest'} 
		<span style="font-size: 12px; color: #6e6d7a">
			• ${dateFormat(new Date())}
		</span>
	</h3>
	<p style="margin: 0; margin-top: 6px">
		${input.content}
	</p>
</div>

<p style="margin: 0; padding-top: 32px; font-size: 12px; color: #6e6d7a">
	You received this email because you've opted into the "When anyone mentions me." email
	notification.<br />
	<a href="https://clembs.com/settings" style="color: inherit"> Unsubscribe </a>
</p>
`),
							},
							userData.email!
						);
					}
				}
			}
		}

		return { success: true };
	},
};
