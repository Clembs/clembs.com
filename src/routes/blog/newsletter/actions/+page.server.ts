import { blogArticles } from '$lib/data/blog-articles';
import { categories } from '$lib/data/blog-articles/categories';
import { db } from '$lib/db';
import type { Newsletter } from '$lib/db/types';
import { newsletterSubscribers } from '$lib/db/schema';
import { dateFormat } from '$lib/helpers/dateFormat';
import { getPostHtml } from '$lib/helpers/getPostHtml';
import { emailHtmlTemplate, sendEmail } from '$lib/helpers/sendEmail';
import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	async sendSubscriptionIntent({ request, url }) {
		const formData = await request.formData();
		const formEmail = formData.get('email')?.toString();
		const list = url.searchParams.get('list') as Newsletter;

		if (!formEmail) {
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

		const existingSubscriber = await db.query.newsletterSubscribers.findFirst({
			where: ({ email }, { eq }) => eq(email, formEmail),
		});

		if (existingSubscriber && existingSubscriber.lists[list] === 'subscribed') {
			return fail(400, {
				message: 'You are already subscribed to this list',
			});
		}

		const triedToSubscribe = existingSubscriber?.lists[list] === 'pending-sub';

		try {
			const subscribeToken =
				existingSubscriber?.subscribeToken || Math.random().toString(36).substring(2, 18);

			if (!existingSubscriber || triedToSubscribe) {
				await db.insert(newsletterSubscribers).values({
					email: formEmail,
					lists: {
						[list]: 'pending-sub',
					},
					subscribeToken,
				});
			} else {
				await db
					.update(newsletterSubscribers)
					.set({
						lists: {
							[list]: 'pending-sub',
						},
						subscribeToken,
					})
					.where(eq(newsletterSubscribers.email, formEmail));
			}

			await sendEmail(
				{
					subject: 'Confirm your newsletter subscription',
					html: emailHtmlTemplate(`
<h1>Thanks for subscribing to ${newsletter.name}!</h1>

<p>
	Please confirm your subscription to the ${newsletter.name} newsletter by clicking the link below:
</p>

<a 
	style="margin-top: 1rem; background-color: #000; color: #fff; padding: 8px 16px; text-decoration: none; border-radius: 32px;"
	href="${url.origin}/blog/newsletter/confirm?email=${encodeURIComponent(
		formEmail,
	)}&token=${subscribeToken}&list=${list}"
>
	Confirm subscription
</a>
					
<p style="padding-top: 32px; font-size: 12px; color: #6E6D7A;">
Not you? You can safely ignore this email.
</p>
				`),
				},
				formEmail,
			);
		} catch (err) {
			return error(404);
		}

		return {
			success: true,
		};
	},
	async send({ url, locals: { getUserData } }) {
		const user = await getUserData();
		const categoryId = url.searchParams.get('category');
		const postId = url.searchParams.get('post');

		if (!user || !user.badges?.includes('CLEMBS')) {
			return fail(403, {
				message: 'You do not have permission to perform this action',
			});
		}

		if (!categoryId || !postId) {
			return fail(400, {
				message: 'Category and post ID are required',
			});
		}

		const category = categories.find((category) => category.id === categoryId);
		const post = blogArticles.find((post) => post.slug === postId);

		if (!category || !post) {
			return fail(404, {
				message: 'Category or post not found',
			});
		}

		const postHtml = await getPostHtml(post);

		const postUrl = new URL(`/blog/${category.id}/${post.slug}`, 'https://clembs.com');

		const subscribers = await db.query.newsletterSubscribers.findMany();

		for (const subscriber of subscribers) {
			if (
				subscriber.lists[category.id] === 'subscribed' &&
				subscriber.email === 'clembombmail@gmail.com'
			) {
				await sendEmail(
					{
						subject: post.title,
						html: emailHtmlTemplate(
							`
<a
	href=${postUrl}
	style="padding-bottom: 16px; color: #6E6D7A; font-size: 14px;"
>
	Read in browser
</a>
•
<a
	href="https://clembs.com"
	style="padding-bottom: 16px; color: #6E6D7A; font-size: 14px;"
>
	clembs.com
</a>

<h1>${post.title}</h1>
<span style="font-size: 14px;">
	<img
		src="https://c.clembs.com/files/Logo+-+Purplue+very+small.png"
		alt="Clembs logo"
		height="32"
		width="32"
		style="vertical-align: middle; border-radius: 50%;"
	/>
	<span style="display: inline-block; vertical-align: middle; padding-left: 8px;">
		Clément "Clembs" Voisin
		<br />
		<span style="color: #6E6D7A;">
		${dateFormat(post.createdAt, false)}
		</span>
	</span>
</span>

${postHtml.replace(/href="#/g, `href="${postUrl}#`)}


<div style="padding-top: 32px;">
	<a
		href="https://clembs.com/blog/newsletter/unsubscribe?list=${category.id}&email=${encodeURIComponent(
			subscriber.email,
		)}&token=${subscriber.unsubscribeToken}"
		style="font-size: 14px; color: #6E6D7A;"
	>
		Unsubscribe from ${category.name}
	</a>
</div>
`,
							url,
						),
					},
					subscriber.email,
				);
			}
		}

		return {
			success: true,
		};
	},
};
