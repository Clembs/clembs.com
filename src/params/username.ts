import { USERNAME_REGEX } from '$lib/helpers/regex';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return USERNAME_REGEX.test(param);
};
