import { categories } from '$lib/data/blog/_categories';
import { db } from '$lib/db';
import type { Newsletter } from '$lib/db/Newsletters';
import { newsletterSubscribers } from '$lib/db/schema';
import { emailHtmlTemplate, sendEmail } from '$lib/helpers/sendEmail';
import { error, fail } from '@sveltejs/kit';

export const actions = {
	async sendSubscriptionIntent({ request, url }) {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const list = url.searchParams.get('list') as Newsletter | null;

		if (!email) {
			return fail(400, {
				message: 'Email is required',
			});
		}

		if (!list) {
			return fail(400, {
				message: 'List is required',
			});
		}

		const newsletter = categories.find((category) => category.id === list);

		if (!newsletter) {
			return fail(400, {
				message: 'Invalid list',
			});
		}

		try {
			const subscribeToken = Math.random().toString(36).substring(2, 18);

			await db.insert(newsletterSubscribers).values({
				email,
				subscribeToken,
				lists: {
					[list]: 'pending-sub',
				},
			});

			await sendEmail(
				{
					subject: 'Confirm your newsletter subscription',
					html: emailHtmlTemplate(`
<h1>Thanks for subscribing to ${newsletter.name}!</h1>

<p>
	Please confirm your subscription to the ${newsletter.name} newsletter by clicking the link below:
</p>

<a 
	style="display: block; margin-top: 1rem; background-color: #000; color: #fff; padding: 8px 16px; text-decoration: none; border-radius: 32px;"
	href="${url.origin}/blog/newsletter/confirm?email=${encodeURIComponent(
		email
	)}&token=${subscribeToken}&list=${list}"
>
	Confirm subscription
</a>
					
<p style="padding-top: 32px; font-size: 12px; color: #6E6D7A;">
Not you? You can safely ignore this email.
</p>
				`),
				},
				email
			);
		} catch (err) {
			return error(404);
		}

		return {
			success: true,
		};
	},
};
