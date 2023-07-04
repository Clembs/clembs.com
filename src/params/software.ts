import { softwareData } from '$lib/data/software';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return !!softwareData.find(({ id }) => id === param);
};
