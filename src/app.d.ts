import type { Session, User } from '$lib/db/types';

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
			navButton?: {
				label: string;
				href: string;
			};
		}
		// interface Platform {}
	}
}

export {};
