import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { languages } from './locales';

export const load: PageServerLoad = ({ cookies }) => {
	let language = cookies.get('language');

	if (!language) {
		language = 'en';
	}

	return {
		themeGradient: { from: '#987fff', to: '#987fff' },
		language,
	};
};

export const actions = {
	async default({ request, cookies }) {
		const formData = await request.formData();

		const language = formData.get('language')?.toString();

		console.log(language);

		if (!language || !Object.keys(languages).includes(language)) {
			throw error(400, 'Invalid language');
		}

		cookies.set('language', language, { path: '/' });

		return {
			success: true,
		};
	},
};
