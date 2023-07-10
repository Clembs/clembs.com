import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import { colors } from '.';
import type { Actions } from './$types';
import type { Message } from '.';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const message: Message = {
			color: data.get('color')?.toString() || 'black',
			content: data.get('question')?.toString()!,
			date: new Date().toISOString(),
			identity: data.get('identity')?.toString(),
		};
		const selectedRawMessage = data.get('selectedMessage')?.toString();
		const selectedParsedMessage: Message | null = selectedRawMessage
			? JSON.parse(selectedRawMessage)
			: null;
		const baseUrlProd = 'https://clembs.com';
		const baseUrlDev = 'http://127.0.0.1:5173';
		const searchParams = new URLSearchParams({
			identity: message.identity ? encodeURI(message.identity) : '',
			question: encodeURI(message.content),
			color: message.color,
			selectedMessage: selectedRawMessage
				? encodeURI(
						JSON.stringify({
							content: selectedParsedMessage!.content,
							color: selectedParsedMessage!.color,
						})
				  )
				: '',
		});

		await fetch(DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				embeds: [
					{
						description: [
							['localhost', `${baseUrlDev}/render-question?${searchParams}`],
							['clembs.com', `${baseUrlProd}/render-question?${searchParams}`],
						]
							.map(([label, url]) => `**[${label}](${url})**`)
							.join(' • '),
						fields: [
							{
								name: 'Identité',
								value: message.identity || 'Unknown',
							},
							{
								name: 'Message',
								value: message.content,
							},
						],
						color: parseInt(colors[message.color].replace('#', ''), 16),
						timestamp: new Date().toISOString(),
					},
				],
			}),
		});

		return { success: true };
	},
} satisfies Actions;
