import type { LayoutServerLoad } from './$types';
import { fetchMinecraftPlayer } from './(account)/_server-helpers';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const language = cookies.get('language') || 'en';
	const { player } = await fetchMinecraftPlayer(cookies);

	return {
		player,
		language,
	};
};
