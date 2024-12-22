import type { categories } from '$lib/data/blog-articles/categories';

export type Newsletter = (typeof categories)[number]['id'];

export type SubscriptionStatus = 'subscribed' | 'pending-sub' | null;
