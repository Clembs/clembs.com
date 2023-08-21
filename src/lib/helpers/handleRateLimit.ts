export const rateLimitMap = new Map<
	string,
	{
		timeWindowMs: number;
		maxRequests: number;
		lastRequestMs: number;
		requests: number;
	}
>();

export const rateLimit = (
	key: string,
	timeWindowMs: number = 1000 * 60,
	maxRequests: number = 5
): boolean => {
	const now = Date.now();
	const rateLimit = rateLimitMap.get(key);
	if (!rateLimit) {
		rateLimitMap.set(key, {
			timeWindowMs,
			maxRequests,
			lastRequestMs: now,
			requests: 1,
		});
		return false;
	}
	if (now - rateLimit.lastRequestMs < timeWindowMs) {
		if (rateLimit.requests >= maxRequests) {
			return true;
		}
		rateLimit.requests++;
	} else {
		rateLimit.requests = 1;
		rateLimit.lastRequestMs = now;
	}

	rateLimitMap.set(key, rateLimit);
	return false;
};
