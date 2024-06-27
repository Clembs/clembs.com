import { error } from '@sveltejs/kit';

export function GET() {
	error(500);
}
