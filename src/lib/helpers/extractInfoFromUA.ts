export function extractInfoFromUA(userAgent: string) {
	const browser = userAgent.match(/(edg|firefox|msie|chrome|safari|trident)/i);
	const os = userAgent.match(/(windows|mac|linux|android|iphone|ipad)/i);
	let browserName = 'Unknown';
	let osName = 'Unknown';

	switch (browser?.[0]) {
		case 'edg':
			browserName = 'Edge';
			break;
		case 'firefox':
			browserName = 'Firefox';
			break;
		case 'msie':
			browserName = 'Internet Explorer';
			break;
		case 'chrome':
			browserName = 'Chrome';
			break;
		case 'safari':
			browserName = 'Safari';
			break;
		case 'trident':
			browserName = 'Internet Explorer';
			break;
		default:
			browserName = 'Unknown';
	}

	switch (os?.[0]) {
		case 'windows':
			osName = 'Windows';
			break;
		case 'mac':
			osName = 'Mac';
			break;
		case 'android':
			osName = 'Android';
			break;
		case 'iphone':
			osName = 'iOS';
			break;
		case 'ipad':
			osName = 'iOS';
			break;
		case 'linux':
			osName = 'Linux';
			break;
		default:
			osName = 'Unknown';
	}

	if (browser && os) {
		return {
			browser: browserName,
			os: osName,
		};
	}
}
