import type { Software } from '.';

export const messages: Software = {
	id: 'messages',
	name: 'Anonymous messages',
	brief: 'A fun idea done in a few hours and no database.',
	createdAt: new Date('2023-02-22'),
	finishedAt: new Date('2023-02-23'),
	description: `I was once bored and looked through Instagram stories, to find that one of my former friends had an app that allowed anyone to ask her questions anonymously, that she would then automatically post to Instagram. The idea had intrigued me, and I wanted to recreate the app for my own account in the minimum amount of time possible and without a database, while giving it my own spin on the UI and features.<br><br>
  Wanting to learn more about HTML forms and webhooks, I immediately started work and 3 hours later, the initial version was published and got really popular among my classmates the day after, receiving about 30 questions a day for the first week!<br><br>
  I later released more UI updates and features, like the ability to change message colors, or to see messages you've previously sent to ask follow-up questions.<br><br>
  On a technical level, all of this was built with SvelteKit and runs on Netlify. To avoid using a database, once the message form is submitted, the message data as JSON is URI encoded and sent as a "reply link" to a Discord webhook. This way, I directly get notified and I simply have to click the link and edit the answer on screen, to screenshot the whole thing and send it to Instagram.`,
	iconPath: 'https://c.clembs.com/files/Group%201565.png',
	iconThumbnailPath: 'https://c.clembs.com/files/Group%201565.png',
	gallery: [
		'https://c.clembs.com/files/3efcf5af33560a8181.png',
		'https://c.clembs.com/files/acbb626fe33736d811.png',
		'https://c.clembs.com/files/64d5d96900701906ed.png',
	],
	links: {
		projectUrl: 'https://clembs.com/messages',
	},
	themeGradient: {
		from: '#3B8FFF',
		to: '#3B8FFF',
	},
};
