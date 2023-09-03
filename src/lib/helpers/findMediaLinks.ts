export function findMediaLinks(string: string) {
	// const mediaRegex = /https?.*?\.(?:mp4|gif)/g;
	const mediaRegex =
		/(https?:\/\/(?:media\.giphy\.com\/media|giphy\.com\/gifs|tenor\.com\/view|tenor\.com\/(?:embed|view))\/[\w-]+)|(https?:\/\/[^\s/$.?#].[^\s]*)\.(?:gif|mp4)/gi;
	const matches = string.match(mediaRegex);

	if (!matches) {
		return null;
	}

	return {
		matches,
		last: matches[matches.length - 1],
	};
}
