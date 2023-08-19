import type { BrandingPost } from '$lib/data/branding';
import type { users } from '$lib/db/schema';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { InferModel } from 'drizzle-orm';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession: () => Promise<Session | null>;
			getUserData: () => Promise<InferModel<typeof users> | null | undefined>;
		}
		interface PageData {
			session: Session | null;
			userData: InferModel<typeof users> | null | undefined;
			themeGradient?: BrandingPost['themeGradient'];
		}
		// interface Platform {}
	}
}

export {};
