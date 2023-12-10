import type { DesignPost } from '$lib/data/design';
import type { sessions, users } from '$lib/db/schema';
import type { Session, User } from '$lib/db/types';
import type { InferModel } from 'drizzle-orm';
import type { SvelteComponent } from 'svelte';

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
			themeGradient?: DesignPost['themeGradient'];
			navButton?: {
				label: string;
				href: string;
				icon?: SvelteComponent;
			};
		}
		// interface Platform {}
	}
}

export {};
