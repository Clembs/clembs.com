import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { stripeApi } from '$lib/stripe';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type Stripe from 'stripe';
import { db } from '$lib/db';
import { purchases, users } from '$lib/db/schema';
import { emailHtmlTemplate, sendEmail } from '$lib/helpers/sendEmail';
import { eq } from 'drizzle-orm';
import { defaultHabileChatData } from '$lib/db/HabileChatData';

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature');

	if (!signature) throw error(400, { message: 'Missing stripe signature' });

	const body = await request.text();

	let event: Stripe.Event;
	try {
		event = stripeApi.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		{
			throw error(400, { message: String(err) });
		}
	}

	if (event.type === 'checkout.session.completed') {
		const sessionWithLineItems = await stripeApi.checkout.sessions.retrieve(event.data.object.id, {
			expand: ['line_items'],
		});
		const email = event.data.object.customer_email!;
		const productId = sessionWithLineItems.line_items!.data[0].price!.product.toString();
		const product = await stripeApi.products.retrieve(productId);
		const userData = (await db.query.users.findFirst({
			where: ({ email: userEmail }, { eq }) => eq(userEmail, email),
		}))!;

		if (product.name.includes('Hydrollars')) {
			const value = Number(product.metadata.value) / 100;

			await db
				.update(users)
				.set({
					habileChatData: {
						...(userData.habileChatData || defaultHabileChatData),
						tokens: (userData.habileChatData?.tokens || 0) + value,
					},
				})
				.where(eq(users.id, userData.id));
		}

		await db.insert(purchases).values({
			checkoutSessionId: sessionWithLineItems.id,
			userId: userData.id,
		});

		await sendEmail(
			{
				subject: `Thanks for purchasing ${product.name}!`,
				html: emailHtmlTemplate(
					`
				<h1>Thanks for purchasing ${product.name}!</h1>
				<p>
					You've successfully purchased and activated <strong>${product.name}</strong> on clembs.com!
				</p>

				<br/>

				<h2>Order details</h2>

				<ul>
					<li>Order ID: ${sessionWithLineItems.id}</li>
					<li>Product name: ${product.name}</li>
					<li>Product ID: ${productId}</li>
					<li>Date: ${new Date(sessionWithLineItems.created * 1000).toLocaleString()}</li>
					<li>Subtotal: ${
						(sessionWithLineItems.amount_subtotal || 0) / 100
					} ${sessionWithLineItems.currency!.toUpperCase()}</li>
					<li>Total: 
						<strong>${
							(sessionWithLineItems.amount_total || 0) / 100
						} ${sessionWithLineItems.currency!.toUpperCase()}
						</strong>
					</li>
				</ul>

				<p style="padding-top: 32px; font-size: 12px; color: #6E6D7A;">
					Not refundable. Question about your purchase, or you didn't receive your product? Contact me at <a href="mailto:clembs@clembs.com">
						clembs@clembs.com
					</a>.
				</p>
			`
				),
			},
			email
		);
	} else if (event.type === 'checkout.session.async_payment_failed') {
		const sessionWithLineItems = await stripeApi.checkout.sessions.retrieve(event.data.object.id, {
			expand: ['line_items'],
		});
		const email = event.data.object.customer_email!;
		const productId = sessionWithLineItems.line_items!.data[0].price!.product.toString();
		const product = await stripeApi.products.retrieve(productId);

		await sendEmail(
			{
				subject: `Payment failed for ${product.name}`,
				html: emailHtmlTemplate(
					`
				<h1>Payment failed for ${product.name}</h1>

				<p>
					Your payment for <strong>${product.name}</strong> on clembs.com has failed. Please try again later.
					<br/>
					If you believe this is a mistake, please contact me at <a href="mailto:clembs@clembs.com">
						clembs@clembs.com
					</a>.
				</p>
				<br/>

				<a
					style="display: block; padding: 8px 16px; background-color: #000000; color: white; text-decoration: none; border-radius: 99px;" 
					href="https://clembs.com/habile/dashboard#add-funds"
				>
					Back to dashboard
				</a>`
				),
			},
			email
		);
	}
	// switch (event.type) {
	// 	case 'checkout.session.completed':
	// 		const session = event.data.object as Stripe.Checkout.Session;
	// 		console.log(session);
	// 		break;
	// 	default:
	// 		console.warn(`Unhandled event type: ${event.type}`);
	// }

	return new Response(null, { status: 200 });
};
