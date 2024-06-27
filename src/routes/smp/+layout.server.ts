import type { LayoutServerLoad } from './$types';
import { fetchMinecraftPlayer } from './register/_server-helpers';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const language = cookies.get('language') || 'en';
	const { player } = await fetchMinecraftPlayer(cookies);

	return {
		themeGradient: { from: '#987fff', to: '#987fff' },
		player,
		language,
	};
};
