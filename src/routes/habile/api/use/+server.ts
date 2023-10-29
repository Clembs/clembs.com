import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HABILE_SECRET, OPENAI_KEY } from '$env/static/private';
import { type GPTMessage, generateChatCompletion } from '@paperdave/openai';
import { messagePrompt } from './prompt';
import { db } from '$lib/db';
import { defaultHabileChatData } from '$lib/db/HabileChatData';
import { habileChatData, users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const secret = request.headers.get('Authorization');
	const userId = request.headers.get('X-User-Id');
	const body = await request.json();

	if (secret !== HABILE_SECRET) throw error(400, 'Invalid secret');
	if (!userId) throw error(400, 'Invalid user id');
	if (!body) throw error(400, 'Invalid body');
	if (!body.content) throw error(400, 'Invalid message');
	if (!body.username) throw error(400, 'Invalid username');
	if (!body.userMessageId) throw error(400, 'Invalid user message ID');
	if (!body.botMessageId) throw error(400, 'Invalid bot message ID');

	const userData = await db.query.users.findFirst({
		where: ({ discordUserId }, { eq }) => eq(discordUserId, userId),
	});

	if (!userData)
		throw error(401, "You haven't linked you Discord profile! Go to the Dashboard to link it.");

	const globalHabileChatData = (await db.query.habileChatData.findFirst())!;

	const userHabileData = { ...defaultHabileChatData, ...(userData.habileChatData ?? {}) };
	const { content, username, botMessageId, userMessageId } = body;

	if (userId !== '327690719085068289' && userHabileData.used >= userHabileData.tokens) {
		throw error(403, {
			message: `You've exceeded your allowed Hydrollar usage.`,
		});
	}

	const messages: GPTMessage[] = [
		{
			role: 'system',
			content: messagePrompt,
		},
		...(userHabileData.knowledge
			? [
					{
						role: 'system',
						content: `Your knowledge about ${username}: ${userHabileData.knowledge}`,
					} as GPTMessage,
			  ]
			: []),
		...(userHabileData.lastMessages.map(({ content, userId }) => {
			return {
				role: !userId || userId === userId ? 'user' : 'assistant',
				content: !userId || userId === userId ? `[${username}]: ${content}` : content,
			};
		}) as GPTMessage[]),
		{
			role: 'user',
			content: `[${username}]: ${content}`,
		},
	];

	const completion = await generateChatCompletion({
		messages,
		model: 'gpt-4',
		maxTokens: 256,
		temperature: 0.8,
		auth: {
			apiKey: OPENAI_KEY,
		},
		retry: 0,
	});

	// TODO: implement this
	// let opinionCompletion: ChatCompletion | null = null;

	// habileChatData.messagesUntilKnowledge -= 1;

	// if (habileChatData.messagesUntilKnowledge <= 0) {
	// 	habileChatData.messagesUntilKnowledge = 5;

	// 	opinionCompletion = await generateKnowledge(msg.author, messages);

	// 	console.log(opinionCompletion);
	// }

	const totalCompletionsPrice = completion.usage.price;

	await db.update(habileChatData).set({
		messages: globalHabileChatData?.messages + 1,
		used: globalHabileChatData?.used + totalCompletionsPrice,
	});

	const [newUserData] = await db
		.update(users)
		.set({
			habileChatData: {
				...userHabileData,
				used: userHabileData.used + totalCompletionsPrice,
				messagesSent: userHabileData.messagesSent + 1,
				lastMessages: [
					...userHabileData.lastMessages.slice(-4),
					{
						id: userMessageId,
						content,
						userId,
					},
					{
						id: botMessageId,
						content: completion.content,
						userId: 'habile',
					},
				],
			},
		})
		.where(eq(users.discordUserId, userId))
		.returning();

	return json({
		completion,
		// opinionCompletion,
		userData: newUserData,
	});
};
