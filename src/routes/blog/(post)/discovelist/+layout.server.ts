import { db } from '$lib/db';

export async function load({ locals: { getUserData } }) {
	const user = await getUserData();

	if (!user) {
		return {
			subscriptionStatus: null,
		};
	}

	const subscription = await db.query.newsletterSubscribers.findFirst({
		where: ({ email }, { eq }) => eq(email, user.email),
	});

	return {
		subscriptionStatus: subscription?.lists.discovelist,
	};
}
