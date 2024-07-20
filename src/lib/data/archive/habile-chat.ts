import type { Archive } from '.';

export const habileChat: Archive = {
	id: 'habile-chat',
	name: 'Habile Chat',
	brief: 'Giving life to my mascot using AI',
	createdAt: new Date('2024-02-07'),
	description: `
Habile was created 2 years ago as a mascot for my livestreaming career and as a Twitch bot to entertain viewers and assist me with my livestreams.

Fast forward to today, she represents the [Clembs brand](/blog/clembs) proudly and is the centerpiece of my [Discord server](/discord).

As I wanted to use OpenAI's GPT-4 model for a big project coming somewhere in the future, I needed a less ambitious project to test the waters and see how I could come up with a way to charge users for the usage of the model.

I chose Habile as the perfect candidate for an AI-centric project, as I could easily add a chatbot feature à-la ChatGPT by training the AI with her attitude, her knowledge and personality.

Since GPT-4 is a paid service, I came up with a way to abstract real life money with a virtual currency, named "Hydrollars" (mix of "Hydro" and "Dollars"). A user normally gets 80 Hydrollars of usage for free (130 for previous [supporters](/donate)) and can buy more with real money.

For the money part of the project, I used Stripe as a payment processor and decided to add a dashboard where users could see their usage and buy more Hydrollars, right into clembs.com.

You simply have to create a [clembs.com account](/software/comments) and link your Discord profile through the bot, and you're good to go.

I'm really grateful of all the support I got during the early testing phases, and I'm excited to see where this simple project can lead me to.
`,
	iconPath: 'https://c.clembs.com/branding/habile-chat/icon.webp',
	iconThumbnailPath: 'https://c.clembs.com/branding/habile-chat/icon.webp',
	links: {
		projectUrl: 'https://clembs.com/habile',
		repoUrl: 'https://github.com/Clembs/clembs.com/tree/main/src/routes/habile',
	},
	themeGradient: {
		from: '#987FFF',
		to: '#987FFF',
	},
};
