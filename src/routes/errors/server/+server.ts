import { error } from '@sveltejs/kit';

export function GET() {
	throw error(500);
}
