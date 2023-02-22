import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import type { Actions } from './$types';
import { env } from '$env/dynamic/public';

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const question = data.get('question')?.toString();
    const identity = data.get('identity')?.toString();
    const date = new Date().toISOString();
    const baseUrlProd = 'https://clembs.com';
    const baseUrlDev = 'http://127.0.0.1:5173';
    const searchParams = new URLSearchParams({
      identity: identity ? encodeURI(identity) : '',
      question: question ? encodeURI(question) : ''
    });

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        embeds: [
          {
            title: 'New question',
            url: `${baseUrlProd}/render-question?${searchParams}`,
            fields: [
              {
                name: 'Date',
                value: date,
                inline: true,
              },
              {
                name: 'Identité',
                value: identity?.toString() || 'Unknown',
                inline: true,
              },
              {
                name: 'Question',
                value: `[${question}](${baseUrlDev}/render-question?${searchParams})`
              },
            ]
          }
        ]
      }),
    });

    return { success: true };    
  }
} satisfies Actions;