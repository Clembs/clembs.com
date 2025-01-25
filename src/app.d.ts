declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			navButton?: {
				label: string;
				href: string;
			};
		}
		// interface Platform {}
	}
}

export {};
