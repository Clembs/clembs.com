import type { BrandingPost } from '$lib/data/branding';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			themeGradient: BrandingPost['themeGradient'];
		}
		// interface Platform {}
	}
}

export {};
