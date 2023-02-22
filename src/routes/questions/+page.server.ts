import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import { colors } from '$lib/colors';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const question = data.get('question')?.toString();
		const identity = data.get('identity')?.toString();
		const color = data.get('color')?.toString()!;
		const baseUrlProd = 'https://clembs.com';
		const baseUrlDev = 'http://127.0.0.1:5173';
		const searchParams = new URLSearchParams({
			identity: identity ? encodeURI(identity) : '',
			question: encodeURI(question!),
			color: color
		});

		const message = {
			embeds: [
				{
					description: [
						['localhost', `${baseUrlDev}/render-question?${searchParams}`],
						['clembs.com', `${baseUrlProd}/render-question?${searchParams}`]
					]
						.map(([label, url]) => `**[${label}](${url})**`)
						.join(' • '),
					fields: [
						{
							name: 'Identité',
							value: identity || 'Unknown'
						},
						{
							name: 'Question',
							value: question
						}
					],
					color: parseInt(colors[color].replace('#', ''), 16),
					timestamp: new Date().toISOString()
				}
			]
		};

		console.log(message);

		await fetch(DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});

		return { success: true };
	}
} satisfies Actions;
