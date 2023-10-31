import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ parent, getClientAddress, fetch }) => {
	const parentData = await parent();
	const habileChatData = await db.query.habileChatData.findFirst();

	return {
		...parentData,
		globalData: habileChatData!,
	};
};
