import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

export const stripeApi = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2023-10-16',
	telemetry: false,
	typescript: true,
});
