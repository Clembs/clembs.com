import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import type { Actions } from './$types';
import { env } from '$env/dynamic/public';

export const actions = {
  default: async ({ request, fetch }) => {
    const data = await request.formData();
    const question = data.get('question');
    const identity = data.get('identity');
    const date = new Date().toISOString();
    const baseUrl = env.PUBLIC_NETLIFY ? 'https://clembs.com' : 'http://127.0.0.1:5173';

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        embeds: [
          {
            title: 'New question',
            url: `${baseUrl}/render-question?${new URLSearchParams({
              identity: identity ? encodeURI(identity.toString()) : '',
              question: question ? encodeURI(question.toString()) : ''
            })}`,
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
                value: question?.toString()
              },
            ]
          }
        ]
      }),
    });

    return { success: true };    
  }
} satisfies Actions;