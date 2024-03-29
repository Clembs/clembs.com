import { db } from '$lib/db';

export async function load({ locals: { getUserData } }) {
	const user = await getUserData();

	if (!user) {
		return {
			subscriptionStatus: null,
		};
	}

	if (!user.badges?.includes('CLEMBS')) {
		const subscription = await db.query.newsletterSubscribers.findFirst({
			where: ({ email }, { eq }) => eq(email, user.email),
		});

		return {
			subscriptionStatus: subscription?.lists.discovelist,
		};
	} else {
		const subscriptions = await db.query.newsletterSubscribers.findMany();

		const subscription = subscriptions.find((sub) => sub.email === user.email);

		return {
			subscriptionStatus: subscription?.lists.discovelist,
			subscribers: subscriptions.length,
		};
	}
}
