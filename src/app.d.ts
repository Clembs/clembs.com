import type { BrandingPost } from '$lib/data/branding';
import type { sessions, users } from '$lib/db/schema';
import type { Session, User } from '$lib/db/types';
import type { InferModel } from 'drizzle-orm';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession: () => Promise<Session | null>;
			getUserData: () => Promise<User | null | undefined>;
		}
		interface PageData {
			session: Session | null;
			userData: User | null | undefined;
			themeGradient?: BrandingPost['themeGradient'];
		}
		// interface Platform {}
	}
}

export {};
