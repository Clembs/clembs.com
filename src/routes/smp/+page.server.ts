import { error } from '@sveltejs/kit';
import { languages } from './locales';

export const actions = {
	async default({ request, cookies }) {
		const formData = await request.formData();

		const language = formData.get('language')?.toString();

		if (!language || !Object.keys(languages).includes(language)) {
			error(400, 'Invalid language');
		}

		cookies.set('language', language, { path: '/' });

		return {
			success: true,
		};
	},
};
